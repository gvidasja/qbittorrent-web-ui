import React, { useState, useContext, createContext } from 'react'
import './Modal.css'

const ModalContext = createContext({})

const ModalRoot = () => (
  <ModalContext.Consumer>
    {({ onOk, onCancel, component: ModalComponent }) =>
      ModalComponent && (
        <div
          className="modal-backdrop"
          onClick={() => {
            onCancel()
          }}
        >
          <div onClick={e => !e.isPropagationStopped() && e.stopPropagation()}>
            <ModalComponent onOk={onOk} onCancel={onCancel} />
          </div>
        </div>
      )
    }
  </ModalContext.Consumer>
)

const ModalProvider = ({ children, ...props }) => {
  const [{ component, onOk, onCancel }, setModal] = useState({ component: null })

  const openModal = ({ component, onOk, onCancel }) =>
    setModal({
      component,
      onOk: (...args) => {
        setModal({ component: null })
        onOk(...args)
      },
      onCancel: (...args) => {
        setModal({ component: null })
        onCancel(...args)
      },
    })

  return (
    <ModalContext.Provider {...props} value={{ component, onOk, onCancel, openModal }}>
      {children}
      <ModalRoot />
    </ModalContext.Provider>
  )
}

const useModal = component => {
  const { openModal } = useContext(ModalContext)

  const openModalWrapped = ({ onOk = () => {}, onCancel = () => {} }) =>
    openModal({ component, onOk, onCancel })

  return [openModalWrapped]
}

export { ModalProvider, useModal }
