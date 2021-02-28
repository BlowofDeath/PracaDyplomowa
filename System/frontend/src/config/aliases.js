const aliases = (prefix = `src`) => ({
  "@atoms": `${prefix}/components/atoms`,
  "@components": `${prefix}/components`,
  "@config": `${prefix}/config`,
  "@hooks": `${prefix}/hooks`,
  "@icons": `${prefix}/icons`,
  "@assets": `${prefix}/assets`,
});

module.exports = aliases;
