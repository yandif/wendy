import React, { ReactNode } from 'react';
import { createPortal } from 'react-dom';

class Modal extends React.Component<{ children: ReactNode }> {
  el: HTMLDivElement;
  constructor(
    props:
      | { children: React.ReactNode }
      | Readonly<{ children: React.ReactNode }>,
  ) {
    super(props);
    this.el = document.createElement('div');
  }

  componentDidMount() {
    let modalRoot = document.getElementById('modal-root');
    if (!modalRoot) {
      modalRoot = document.createElement('div');
      modalRoot.id = 'modal-root';
      document.body.appendChild(modalRoot);
    }
    modalRoot?.appendChild(this.el);
  }

  componentWillUnmount() {
    const modalRoot = document.getElementById('modal-root');
    modalRoot?.removeChild(this.el);
  }

  render() {
    return createPortal(this.props.children, this.el);
  }
}

class App extends React.Component<
  { children?: ReactNode },
  { showModal: boolean }
> {
  constructor(
    props:
      | { children: React.ReactNode }
      | Readonly<{ children: React.ReactNode }>,
  ) {
    super(props);
    this.state = { showModal: false };
    this.handleShow = this.handleShow.bind(this);
    this.handleHide = this.handleHide.bind(this);
  }

  handleShow() {
    this.setState({ showModal: true });
  }

  handleHide() {
    this.setState({ showModal: false });
  }

  render() {
    const modal = this.state?.showModal ? (
      <Modal>
        <div className="modal">
          <div className="modal-body">
            <button onClick={this.handleHide}>Close</button>
            {this.props.children}
          </div>
        </div>
      </Modal>
    ) : null;

    return (
      <div className="app">
        <button onClick={this.handleShow}>Show Modal</button>
        {modal}
      </div>
    );
  }
}
