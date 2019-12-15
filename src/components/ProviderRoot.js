const ProviderRoot = ({ providers, children, ...props }) => {
  if (providers.length <= 1) {
    return React.createElement(providers.shift(), props, ...children)
  } else {
    let provider = React.createElement(providers.shift(), { children })

    while (providers.length > 1) {
      provider = React.createElement(providers.shift(), {}, provider)
    }

    return React.createElement(providers.shift(), props, provider)
  }
}

export default ProviderRoot
