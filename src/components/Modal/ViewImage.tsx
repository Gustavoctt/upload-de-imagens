import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  return(
    <Modal
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalBody
          bg="pGray.800"
          maxWidth={['900px']}
          maxHeight={['600px']}
          p={['0']}
        >
          <Image src={imgUrl} w="inherit"/>
        </ModalBody>
        <ModalFooter
          bg="pGray.800"
          justifyContent="left"
          fontSize={['14px']}
          w={['inherit']}
        >
          <Link
            href={imgUrl}
            target='_blank'
          >
            Abrir original
          </Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
