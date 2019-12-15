import React, { useState, createContext, useContext } from 'react'
import Alert, { ALERT_TYPE } from '../components/Alert'
import './Alerts.css'

const AlertsContext = createContext({
  alerts: [],
  onClose: () => {},
  addAlert: () => {},
})

const AlertsRoot = () => (
  <AlertsContext.Consumer>
    {({ alerts, onClose }) => (
      <div className="alerts-container">
        {alerts.map((alert, index) => (
          <Alert key={index} {...alert} onClose={onClose(index)} />
        ))}
      </div>
    )}
  </AlertsContext.Consumer>
)

const AlertsProvider = ({ children, ...props }) => {
  const [alerts, setAlerts] = useState([])

  const onClose = index => () =>
    setAlerts(existingAlerts => existingAlerts.filter((_, i) => i !== index))

  const addAlert = alert => setAlerts(existingAlerts => [...existingAlerts, alert])

  return (
    <AlertsContext.Provider {...props} value={{ alerts, onClose, addAlert }}>
      {children}
      <AlertsRoot></AlertsRoot>
    </AlertsContext.Provider>
  )
}

const useAlerts = () => {
  const { addAlert } = useContext(AlertsContext)

  return {
    showInfo: (message, timeOut) => addAlert({ type: ALERT_TYPE.INFO, message, timeOut }),
    showError: (message, timeOut) => addAlert({ type: ALERT_TYPE.ERROR, message, timeOut }),
  }
}

export { AlertsProvider, useAlerts }
