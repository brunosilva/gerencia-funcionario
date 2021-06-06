import { useState } from 'react';
import Modal from 'react-modal';

import { Row, Button, Form, Divider, Input, Col } from 'antd';
import {
    CloseOutlined
} from '@ant-design/icons';


interface OpenModalProps{
    onOpenNewTransactionModal: () => void;
}


export default function EditarFuncionario({onOpenNewTransactionModal}: OpenModalProps) {
    const [modalIsOpen, setIsOpen] = useState(false);
    const [form] = Form.useForm();

    function closeModal() {
        setIsOpen(false);
    }

    return (
        <>
            {/* <CloseOutlined style={{ float: 'right' }} onClick={closeModal} /> */}
            <Form
                layout="vertical">
                <h1>Editar Funcionário</h1>
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
        </>
    )
}