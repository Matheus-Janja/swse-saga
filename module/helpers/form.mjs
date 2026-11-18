/**
 * Formulários enviam "system.modifiers.0.value" como objeto {0:{value}}. Converte esses objetos em arrays,
 * mesclando com o array atual do documento para não perder campos não presentes no formulário.
 */
export function fixArrayFields(data, doc, paths) {
  for (const path of paths) {
    const value = foundry.utils.getProperty(data, path);
    if (!value || Array.isArray(value) || typeof value !== "object") continue;
    const current = foundry.utils.deepClone(foundry.utils.getProperty(doc._source, path) ?? []);
    for (const [i, entry] of Object.entries(value)) {
      const idx = Number(i);
      if (!Number.isInteger(idx)) continue;
      current[idx] = foundry.utils.mergeObject(current[idx] ?? {}, entry, { inplace: false });
    }
    foundry.utils.setProperty(data, path, current);
  }
  return data;
}
