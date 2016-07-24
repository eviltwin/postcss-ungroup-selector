'use strict'

const postcss = require('postcss')

const plugin = () => css => {
  css.walkRules(rule => {
    const pattern = /::-[A-Za-z]+-/g
    const matches = rule.selector.match(pattern) || []

    for (const match of matches) {
      rule.cloneBefore({
        selectors: rule.selectors.filter(s => s.indexOf(match) !== -1)
      })
    }

    const remainingSelectors = rule.selectors.filter(s => !s.match(pattern))

    if (remainingSelectors.length > 0) {
      rule.selectors = remainingSelectors
    } else {
      rule.remove()
    }
  })
}

module.exports = postcss.plugin('ungroup-vendor-pseudo-element-selectors', plugin)
