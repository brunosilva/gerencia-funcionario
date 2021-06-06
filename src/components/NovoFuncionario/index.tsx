import { useState } from 'react';
import Modal from 'react-modal';

import { Row, Button, Form, Divider, Input, Col } from 'antd';
import {
    PlusOutlined,
    CloseOutlined
} from '@ant-design/icons';

import style from './style.module.scss';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
        const min = 10;
        const max = 100;

        try{
            if(a == null || a == undefined){
                throw new Error();
            }
            a.id = Math.floor(Math.random() * (max - min) + min);
            localStorage.setItem('@gerencia-funcionario:funcionario', JSON.stringify(a));
            closeModal();
            toast.success('Cadastro realizado com sucesso.');
            return;
        } catch {
            toast.error('Obrigatório preencher todos os campos');
            return;
        }
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
                        <Row gutter={10}>
                            <Col span={12}>
                                <Form.Item
                                    name={['nome']}
                                    label="Nome"
                                >
                                    <Input type="text" placeholder="Nome" required />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    name={['cpf']}
                                    label="CPF"
                                >
                                    <Input type="number" placeholder="CPF" required />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={10}>
                            <Col span={8}>
                                <Form.Item
                                    name={['salario']}
                                    label="Salário"
                                >
                                    <Input type="number" placeholder="Salário Bruto" required />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    name={['desconto']}
                                    label="Desconto"
                                >
                                    <Input type="number" placeholder="Desconto" required />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    name={['dependentes']}
                                    label="Dependentes"
                                >
                                    <Input type="number" placeholder="Dependentes" required />
                                </Form.Item>
                            </Col>
                        </Row>
                        

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