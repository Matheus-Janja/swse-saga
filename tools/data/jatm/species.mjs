// Jedi Academy Training Manual — espécie Shard (Iron Knights, Cap. 4).
export default [{
  name: "Shard", type: "species", img: "icons/environment/people/group.webp",
  system: {
    key: "shard", size: "medium", speed: 6, swimSpeed: 0, droid: false, primitive: false,
    bonusFeats: [], bonusFeatChoices: 0, bonusTrainedSkills: 1, conditionalFeats: [], rerolls: [],
    modifiers: [], languages: "Basic, Binary (só por computador ou vocabulador)", naturalWeapon: "", source: "Jedi Academy Training Manual",
    abilityMods: { str: 0, dex: -2, con: 0, int: 0, wis: 2, cha: 0 },
    description: "<p>Seres cristalinos de Orax, sencientes e sensíveis à Força, que vivem implantados em corpos de droide; os Iron Knights são Shards treinados como Jedi.</p>",
    traits: [
      { name: "Bonus Skill", text: "Recebe Use Computer como perícia treinada adicional, de qualquer classe (marque Use Computer como treinada)." },
      { name: "Droid Shell", text: "Vive num corpo de droide: manutenção como droide; imune a veneno, doença, radiação, perigos atmosféricos não corrosivos e vácuo; só recupera PV com Repair Droid (Mechanics), sem cura natural (exceto com Force Repair); é criatura cibernética (sofre íons como droide, automático); pode usar apêndices, armadura, comunicação, armazenamento, sensores e tradutor de droide (multiplicador de custo ×1). Mantém o valor de Constituição." },
      { name: "Automatic Languages", text: "Basic e Binary; só se comunica com outros por computador ou vocabulador." }
    ]
  }
}];
