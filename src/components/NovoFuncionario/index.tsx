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

    function handleFormSubmit(a: any) {
        console.log(a);
        localStorage.setItem('@gerencia-funcionario:funcionario', JSON.stringify(a));
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
                    ariaHideApp={false}
                >

                    <CloseOutlined style={{ float: 'right' }} onClick={closeModal} />
                    <Form
                        layout="vertical"
                        onFinish={handleFormSubmit}
                        form={form}>
                        <h1>Cadastrar Funcionário</h1>
                        <Divider />
                        <Form.Item
                            name={['nome']}
                            label="Nome"
                        >
                            <Input type="text" placeholder="Nome" required />
                        </Form.Item>
                        <Form.Item
                            name={['cpf']}
                            label="CPF"
                        >
                            <Input type="number" placeholder="CPF" required />
                        </Form.Item>
                        <Form.Item
                            name={['salario']}
                            label="Salário"
                        >
                            <Input type="number" placeholder="Salário Bruto" required />
                        </Form.Item>
                        <Form.Item
                            name={['desconto']}
                            label="Desconto"
                        >
                            <Input type="number" placeholder="Desconto" required />
                        </Form.Item>
                        <Form.Item
                            name={['dependentes']}
                            label="Dependentes"
                        >
                            <Input type="number" placeholder="Dependentes" required />
                        </Form.Item>

                        <Divider />
                        <Button style={{ float: 'right' }} htmlType="submit" type="primary" data-testid="edit-user-button">
                            <div className="text">Salvar</div>
                        </Button>
                    </Form>
                </Modal>
            </Row>
        </div>
    )
}