const React = require('react')

exports.HelmetProvider = function HelmetProvider({ children }) {
  return React.createElement(React.Fragment, null, children)
}

exports.Helmet = function Helmet({ children }) {
  return React.createElement(React.Fragment, null, children)
}

exports.default = exports.Helmet
