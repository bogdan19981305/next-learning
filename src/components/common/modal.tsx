'use client';
import {Modal, ModalBody, ModalContent, ModalHeader,} from "@heroui/react";
import React from "react";
import {ModalFooter} from "@heroui/modal";
import classNames from "classnames";

interface CustomModalProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
    title: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
    className?: string;
}

const CustomModal = ({isOpen,onOpenChange, title, children, footer, className}: CustomModalProps) => {
    return (
        <Modal className={classNames('',className)} isOpen={isOpen} onOpenChange={onOpenChange}>
            <ModalContent className="p-2 bg-gray-900 rounded-lg shadow-lg relative">
                <ModalHeader className="flex flex-col gap-1">{title}</ModalHeader>
                <ModalBody>
                    {children}
                </ModalBody>
            </ModalContent>
            {footer && (
                <ModalFooter className="flex justify-end">
                    {footer}
                </ModalFooter>
            )}
        </Modal>
    )
}

export default CustomModal;