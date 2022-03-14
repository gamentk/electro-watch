import { useState } from 'react';

const useDisclosure = (initialValue = false) => {
    const [isOpen, setIsOpen] = useState(initialValue);

    const store = {
        isOpen,
        onOpen: () => setIsOpen(true),
        onClose: () => setIsOpen(false),
        onToggle: () => setIsOpen(!isOpen)
    };

    return store;
}

export default useDisclosure;