console.log('test');

import React, { useEffect, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { createBreakpoint } from 'styled-components-breakpoint';
import Imgix from 'react-imgix';

const breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 900,
  xl: 1200
};
const breakpoint = createBreakpoint(breakpoints);
const fadeInOverlay = keyframes`
  0% {
    opacity: 0;
    z-index: -1;
  }
  100% {
    opacity: 1;
    z-index: 9999;
  }
`;
const fadeInWrapper = keyframes`
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
`;
const slideUp = keyframes`
  0% {
    opacity: 1;
    z-index: -1;
    transform: scale(1) translateY(100%);
  }

  100% {
    opacity: 1;
    z-index: 9999;
    transform: scale(1) translateY(0);
  }
`;
const ModalOverlay = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  cursor: pointer;
  background-color: rgba(43, 43, 43, 0.8);
  z-index: 9999;
  opacity: 1;
  animation: 0.3s ${fadeInOverlay} ease-out;

  ${breakpoint("lg")`
    padding: 2rem;
  `}
`;
const ModalWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  height: 100%;
  transform: scale(1) translateY(100%);
  animation-name: ${slideUp};
  animation-duration: 0.3s;
  animation-delay: 0.2s;
  animation-fill-mode: forwards;

  ${breakpoint("lg")`
    width: 90vw;
    align-items: center;
    transform: scale(0);
    animation-name: ${fadeInWrapper};
  `}
`;
const ModalUI = styled.div`
  display: flex;
  flex-flow: row wrap;
  align-items: flex-end;
  justify-content: center;
  width: 100%;
  height: 100%;

  ${breakpoint("lg")`
    height: auto;
    flex-flow: row nowrap;
    align-items: flex-start;
  `}

  .modal--video & {
    flex-flow: column nowrap;
    justify-content: center;

    ${breakpoint("lg")`
      align-items: flex-start;
      flex-flow: row wrap;
    `}
  }
`;
const ModalContent = styled.div`
  position: relative;
  width: 100%;
  max-width: 75rem;
  height: 80vh;
  height: calc(var(--vh, 1vh) * 80);
  padding: 1.25rem;
  overflow: auto;
  cursor: default;
  display: flex;
  flex-flow: column wrap;
  order: 2;
  align-items: flex-start;
  background-color: white;

  &:before {
    content: "";
    display: block;
    width: 4.5rem;
    height: 0.3rem;
    position: absolute;
    top: 1rem;
    left: 50%;
    transform: translateX(-50%);
    background-color: black;

    ${breakpoint("lg")`
      display: none;
    `}
  }

  &:focus {
    outline: none;
  }

  &:focus-visible {
    outline: none !important;
  }

  .modal--video & {
    height: auto;
    padding: 0 1rem;
    align-items: center;
    background-color: transparent;
    &:before {
      display: none;
    }

    iframe {
      background-color: black;
    }
  }

  .modal--iframe & {
    padding: 2rem 0;
  }

  iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    margin: auto;
    border: 0;
    overflow: auto;
  }

  ${breakpoint("lg")`
    order: 1;
    width: 80vw;
    height: auto;
    max-width: 75rem;
    max-height: 80%;
    max-height: 80vh;
    background-color: white;

    .modal--video & {
      padding: 0;
      max-width: calc(100% - 7rem);
      max-height: 72rem;
      background-color: black;
    }

    .modal--iframe & {
      padding: 0;
      height: ${props => props.contentHeight ? `${props.contentHeight}px` : "95vh"};
    }
  `}
`;
const ModalClose = styled.button`
  position: relative;
  display: none;
  width: 3rem;
  min-width: 3rem;
  height: 3rem;
  min-height: 3rem;
  color: white;
  border: 0;
  padding: 0;
  order: 1;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 3rem;
  font-weight: 400;
  font-style: normal;
  font-family: var(--font-urw-din);
  margin: 0 0 1rem auto;
  background-color: black;
  overflow: hidden;

  ${breakpoint("lg")`
    display: flex;
    order: 2;
    margin: 0 0 0 2rem;
  `}

  span {
    margin-top: -0.1rem;
    line-height: 3rem;
  }

  .modal--video & {
    display: flex;
    margin-right: 1rem;

    ${breakpoint("lg")`
      margin-right: 0;
    `}
  }
`;
const ModalBox = styled.div`
  width: 100%;
  position: relative;

  .modal--video & {
    height: 0;
    padding-top: 56.25%;
  }

  .modal--iframe & {
    height: 100%;
  }
`;
function Modal({
  children,
  toggleModal,
  modalCaller,
  modalIsShown,
  className = "",
  video = false,
  iframe = false,
  contentHeight
}) {
  const handleClickOutside = e => {
    if (modalIsShown === true && e.target.classList.length > 0 && e.target.classList.contains("modal--close")) {
      toggleModal(false);
    }
  };

  const detectEscapeKeyPress = e => {
    if (modalIsShown === true && e.keyCode === 27) {
      toggleModal(false);
    }
  };

  const handleFocus = () => {
    const elementToFocus = modalIsShown ? document.querySelector(".modal__content") : modalCaller;

    if (elementToFocus) {
      elementToFocus.focus();
    }
  };

  const calculateVH = () => {
    // different mobile browsers have different ideas on whether a vh unit
    // should include browser chrome, so here we are.
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  };

  const handleOutsideScroll = () => {
    const containerOverflow = modalIsShown ? "hidden" : "visible";
    document.querySelector("html").style.overflow = containerOverflow;
  };

  useEffect(() => {
    calculateVH();
    handleFocus();
    handleOutsideScroll();
    document.addEventListener("click", handleClickOutside, false);
    document.addEventListener("keydown", detectEscapeKeyPress, false);
    return () => {
      document.removeEventListener("click", handleClickOutside, false);
      document.removeEventListener("keydown", detectEscapeKeyPress, false);
    };
  }, [modalIsShown]);
  return modalIsShown ? ReactDOM.createPortal( /*#__PURE__*/React.createElement(ModalOverlay, {
    className: `modal__overlay modal--close ${video ? "modal--video" : ""} ${iframe ? "modal--iframe" : ""} ${className}`
  }, /*#__PURE__*/React.createElement(ModalWrapper, {
    role: "dialog",
    className: "modal__wrapper modal--close"
  }, /*#__PURE__*/React.createElement(ModalUI, {
    className: `modal__ui modal--close`
  }, /*#__PURE__*/React.createElement(ModalContent, {
    className: `modal__content`,
    tabIndex: 0,
    contentHeight: contentHeight
  }, /*#__PURE__*/React.createElement(ModalBox, null, children)), /*#__PURE__*/React.createElement(ModalClose, {
    className: `modal__close qa--modal-close modal--close`
  }, /*#__PURE__*/React.createElement("span", {
    className: "modal--close"
  }, "\xD7"))))), document.body) : null;
}
Modal.propTypes = {
  modalIsShown: PropTypes.bool.isRequired,
  toggleModal: PropTypes.func.isRequired,
  video: PropTypes.bool,
  iframe: PropTypes.bool,
  contentHeight: PropTypes.number
};

const CalloutWrapper = styled.div`
  position: fixed;
  bottom: 45px;
  right: 34px;
  width: 199px;
  height: 167px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 9;
  outline: #ccc 1px solid;
  color: #1f1d1e;
  background-color: #fff;
  filter: drop-shadow(6px 6px 6px #00000029);
  cursor: pointer;
  text-transform: uppercase;
  font-size: 15px;
  font-weight: bold;
  line-height: 1.2;
  visibility: ${props => props.visibility};
  transition: visibility 1s;
  animation: 1s ${props => props.slideDirection};

  &:hover {
    outline: #000 1px solid;
  }

  @keyframes slideUp {
    from {
      bottom: -170px;
    }

    to {
      bottom: 45px;
    }
  }

  @keyframes slideDown {
    from {
      bottom: 45px;
    }

    to {
      bottom: -170px;
    }
  }
`;
const Button = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  margin: 6px;
  cursor: pointer;
  outline: none;
  font-size: 25px;
  line-height: 0.5em;
  z-index: 100;
  border: 0;
  padding: 0;
  background-color: #fff;
`;
const CalloutInnerWrapper = styled.span`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
const Content = styled.div`
  margin-bottom: 10px;
`;
const Text = styled.div`
  text-align: center;
`;

const CallOut = props => {
  const isCalloutSessionClosed = Boolean(window.sessionStorage.getItem(props.sessionStorageItem || "callout-session-closed"));
  const [slideDirection, setSlideDirection] = useState("slideUp");
  const [visibility, setVisibility] = useState("visible");
  const [isCalloutClosed] = useState(isCalloutSessionClosed);
  const [modalIsShown, toggleModal] = useState(false);
  const [modalCaller, setModalCaller] = useState();

  const closeCallout = () => {
    setSlideDirection("slideDown");
    setVisibility("hidden");
  };

  const handleClick = e => {
    setModalCaller(e.currentTarget);
    toggleModal(!modalIsShown);
    closeCallout();
  };

  const handleCloseButtonClick = () => {
    closeCallout();
    toggleModal(false);
    window.sessionStorage.setItem(props.sessionStorageItem || "callout-session-closed", "true");
  };

  return !isCalloutClosed && /*#__PURE__*/React.createElement(CalloutWrapper, {
    slideDirection: slideDirection,
    visibility: visibility,
    className: "qa-callout-wrapper"
  }, /*#__PURE__*/React.createElement(Button, {
    onClick: handleCloseButtonClick
  }, "\xD7"), /*#__PURE__*/React.createElement(CalloutInnerWrapper, {
    onClick: e => handleClick(e),
    className: "qa-callout-wrapper__inner"
  }, /*#__PURE__*/React.createElement(Content, null, props.children), /*#__PURE__*/React.createElement(Text, null, props.text)), props.iframeUrl ? /*#__PURE__*/React.createElement(Modal, {
    modalIsShown: modalIsShown,
    toggleModal: toggleModal,
    modalCaller: modalCaller,
    contentHeight: props.contentHeight || 500,
    iframe: true
  }, /*#__PURE__*/React.createElement("iframe", {
    src: props.iframeUrl
  })) : "");
};

const figcaption = {
  display: "none"
};

const VirtualAdvisor = props => props.isEnabled && /*#__PURE__*/React.createElement(CallOut, {
  text: "Questions about product or sizing?",
  iframeUrl: "https://arcteryx.com/help/va-modal/",
  sessionStorageItem: "callout-session-closed--va"
}, /*#__PURE__*/React.createElement("figure", null, /*#__PURE__*/React.createElement(Imgix, {
  src: "https://images-dynamic-arcteryx.imgix.net/virtual-advisor-callout/a6ff6a61-6c57-44ec-bdb0-dcae77bb05d6.png",
  height: 83,
  imgixParams: {
    auto: "format,compress",
    q: 75
  },
  htmlAttributes: {
    alt: "Virtual Advisor"
  }
}), /*#__PURE__*/React.createElement("figcaption", {
  style: figcaption
}, "Virtual Advisor")));

//# sourceMappingURL=index.js.map

ReactDOM.render(<VirtualAdvisor isEnabled={true} />, document.getElementById('va-root'))