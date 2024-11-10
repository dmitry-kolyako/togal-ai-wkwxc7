// Backdrop with semi-transparent and blur effect
import styled from "styled-components";

export const Backdrop = styled.div.withConfig({
    shouldForwardProp: (prop) =>!['isOpen'].includes(prop),
})<{ isOpen: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  z-index: 999;
`;

// Centered modal container
export const ModalContainer = styled.div`
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    padding: 2rem;
    border-radius: 8px;
    max-width: 500px;
    width: 100%;
    z-index: 1000;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
`;