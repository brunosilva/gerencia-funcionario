import { useState } from 'react';
import Modal from 'react-modal';

import { Row, Button, Form, Divider, Input } from 'antd';
import {
    PlusOutlined,
    CloseOutlined
} from '@ant-design/icons';

import style from './style.module.scss';


const customStyles = {
    content: {
        width: '50%',
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};


export default function NovoFuncionario() {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [form] = Form.useForm();

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <div className={style.novoFuncionario}>
            <Row className={style.botaoAbrirModal}>
                <Button type="primary" icon={<PlusOutlined />} onClick={openModal} size={'large'}>
                    Novo Funcionário
                </Button>
            </Row>
            <Row className={style.modalForm}>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={customStyles}
                    
                >

                    <CloseOutlined style={{ float: 'right' }} onClick={closeModal} />
                    <Form
                        layout="vertical"
                        form={form}>
                        <h1>Cadastrar Funcionário</h1>
                        <Divider />
                        <Row className={style.rowInput}>
                            <Input type="text" placeholder="Nome" />
                        </Row>
                        <Row className={style.rowInput}>
                            <Input type="number" placeholder="CPF" />
                        </Row>
                        <Row className={style.rowInput}>
                            <Input type="number" placeholder="Salário" />
                        </Row>
                        <Row className={style.rowInput}>
                            <Input type="number" placeholder="Desconto" />
                        </Row>
                        <Row className={style.rowInput}>
                            <Input type="number" placeholder="Dependentes" />
                        </Row>

                        <Divider />
                        <Button style={{ float: 'right' }} type="primary" data-testid="edit-user-button">
                            <div className="text">Salvar</div>
                        </Button>
                    </Form>
                </Modal>
            </Row>
        </div>
    )
}