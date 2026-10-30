/**
 * Visibility and answer validation on the real corpus (ADR 0016 §3).
 */
import { describe, expect, it } from 'vitest';
import { checkAnswers, resolveAnswers, resolveSector } from '../src/answers.ts';
import { InvalidAnswersError } from '../src/errors.ts';
import type { Answers } from '../src/types.ts';
import { realCorpus } from './helpers.ts';

const energy: Answers = {
  psnc: 'no',
  dora: 'no',
  cloud_pa: 'no',
  tipologia_elettrica: 'dso',
  attivita_elettriche_ulteriori: [],
  pertinenza_pubblica_energia: 'no',
  soggetto_critico: 'no',
  dimension: 'media',
};

const issuesOf = (sectorId: string, answers: Answers) => checkAnswers(resolveSector(sectorId, realCorpus()), answers).issues;

describe('questions of a sector', () => {
  it('follow flow_order: common block, sector questions, standard identification', () => {
    const ids = resolveSector('energia_elettrica', realCorpus()).questions.map((q) => q.id);
    expect(ids.slice(0, 3)).toEqual(['psnc', 'dora', 'cloud_pa']);
    expect(ids.slice(-2)).toEqual(['soggetto_critico', 'dimension']);
    expect(ids.indexOf('tipo_partecipazione_pubblica')).toBe(ids.indexOf('pertinenza_pubblica_energia') + 1);
  });

  it('exclude the common questions listed in excluded_common_questions', () => {
    const ids = resolveSector('pubblica_amministrazione', realCorpus()).questions.map((q) => q.id);
    expect(ids).not.toContain('dimension');
    expect(ids).not.toContain('cloud_pa');
    expect(ids).toContain('soggetto_critico');
  });

  it('unknown sector -> InvalidAnswersError unknown_sector', () => {
    try {
      resolveSector('sanitario', realCorpus());
      expect.unreachable();
    } catch (e) {
      expect(e).toBeInstanceOf(InvalidAnswersError);
      expect((e as InvalidAnswersError).issues[0]!.kind).toBe('unknown_sector');
    }
  });
});

describe('answer validation', () => {
  it('accepts a complete answer set; optional multi_select may be absent', () => {
    expect(issuesOf('energia_elettrica', energy)).toEqual([]);
    const { attivita_elettriche_ulteriori: _skip, ...withoutOptional } = energy;
    expect(issuesOf('energia_elettrica', withoutOptional)).toEqual([]);
  });

  it('missing visible question -> missing', () => {
    const { dimension: _d, ...rest } = energy;
    expect(issuesOf('energia_elettrica', rest)).toEqual([expect.objectContaining({ questionId: 'dimension', kind: 'missing' })]);
  });

  it('extra key -> unknown_question', () => {
    expect(issuesOf('energia_elettrica', { ...energy, categoria_pa: 'a' })).toEqual([
      expect.objectContaining({ questionId: 'categoria_pa', kind: 'unknown_question' }),
    ]);
  });

  it('excluded common question answered in the PA -> unknown_question', () => {
    const pa: Answers = { psnc: 'no', dora: 'no', categoria_pa: 'a', classificazione_cloud_pa: 'no', soggetto_critico: 'no' };
    expect(issuesOf('pubblica_amministrazione', pa)).toEqual([]);
    expect(issuesOf('pubblica_amministrazione', { ...pa, dimension: 'grande' })).toEqual([
      expect.objectContaining({ questionId: 'dimension', kind: 'unknown_question' }),
    ]);
  });

  it('answer to a question hidden by visible_if -> not_visible', () => {
    expect(issuesOf('energia_elettrica', { ...energy, registrato_pun: 'si' })).toEqual([
      expect.objectContaining({ questionId: 'registrato_pun', kind: 'not_visible' }),
    ]);
  });

  it('visible_if any_of with includes: PUN question visible from the further activities', () => {
    const answers = { ...energy, attivita_elettriche_ulteriori: ['gestore_punti_ricarica'] };
    expect(issuesOf('energia_elettrica', answers)).toEqual([expect.objectContaining({ questionId: 'registrato_pun', kind: 'missing' })]);
    expect(issuesOf('energia_elettrica', { ...answers, registrato_pun: 'no' })).toEqual([]);
  });

  it('follow-up visible only with the parent answer trigger_on', () => {
    expect(issuesOf('energia_elettrica', { ...energy, tipo_partecipazione_pubblica: 'ente_pubblico' })).toEqual([
      expect.objectContaining({ questionId: 'tipo_partecipazione_pubblica', kind: 'not_visible' }),
    ]);
    expect(issuesOf('energia_elettrica', { ...energy, pertinenza_pubblica_energia: 'yes' })).toEqual([
      expect.objectContaining({ questionId: 'tipo_partecipazione_pubblica', kind: 'missing' }),
    ]);
  });

  it.each([
    ['dimension', 'enorme'],
    ['psnc', 'si'],
    ['dimension', ['media']],
    ['attivita_elettriche_ulteriori', 'dso'],
    ['attivita_elettriche_ulteriori', ['dso', 'dso']],
    ['attivita_elettriche_ulteriori', ['eolico']],
  ] as const)('%s = %j -> invalid_value', (id, value) => {
    expect(issuesOf('energia_elettrica', { ...energy, [id]: value })).toEqual([expect.objectContaining({ questionId: id, kind: 'invalid_value' })]);
  });

  it('collects every issue and throws InvalidAnswersError from resolveAnswers', () => {
    const ctx = resolveSector('energia_elettrica', realCorpus());
    const { dimension: _d, ...rest } = energy;
    try {
      resolveAnswers(ctx, { ...rest, psnc: 'forse', ignota: 'x' });
      expect.unreachable();
    } catch (e) {
      expect(e).toBeInstanceOf(InvalidAnswersError);
      expect((e as InvalidAnswersError).issues.map((i) => `${i.questionId}:${i.kind}`).sort()).toEqual([
        'dimension:missing',
        'ignota:unknown_question',
        'psnc:invalid_value',
      ]);
    }
  });

  it('every golden fixture has valid answers', () => {
    for (const fx of Object.values(realCorpus().fixtures)) {
      expect(issuesOf(fx.sector, fx.inputs), fx.scenario_id).toEqual([]);
    }
  });
});
