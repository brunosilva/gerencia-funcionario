import { useEffect, useState } from 'react';
import Modal from 'react-modal';

import { Row, Table, Button, Col, Popover, Form, Divider, Input } from 'antd';
import {
    CloseOutlined
} from '@ant-design/icons';

import { api } from '../../services/api';

import style from './style.module.scss';
import NovoFuncionario from '../NovoFuncionario';
import { toast } from 'react-toastify';
// import EditarFuncionario from '../EditarFuncionario';

interface FuncionarioProps {
    id: number;
    nome: string;
    cpf: number;
    salario: number;
    desconto: number;
    dependentes: number;
    descontoirrf: number;
    dadosLocalStorage: [];
}

interface EditarFuncionarioProps {
    id: number;
    nome: string;
    cpf: string;
    salario: number;
    desconto: number;
    dependentes: number;
    descontoirrf: number;
}

const content = (
    <div>
        <img src="./tabelaIRRF.png" />
    </div>
);

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

export default function Funcionario() {
    const [funcionarios, setFuncionarios] = useState<FuncionarioProps[]>([]);
    const [modalIsOpen, setIsOpen] = useState(false);
    const [editarFuncionario, setEditarFuncionario] = useState(0);
    const [detalheFuncionario, setDetalheFuncionario] = useState<EditarFuncionarioProps>({} as EditarFuncionarioProps);
    const [form] = Form.useForm();
    var deducaoDependente = 164.56;

    function openModal() {
        setIsOpen(true);
    }

    function closeModal() {
        setIsOpen(false);
    }

    // Buscar todos os Funcionários
    useEffect(() => {
        api.get<FuncionarioProps[]>(`/pessoas`).then(response => {
            // Recuperar dados do localStorage
            // const dadosLocalStorage = localStorage.getItem('@gerencia-funcionario:funcionario');
            // const todosFuncionarios = {
            //     ...funcionarios,
            //     dadosLocalStorage
            // }
            setFuncionarios(response.data);
        });
    }, []);

    // Buscar Funcionários por ID
    useEffect(() => {
        api.get<EditarFuncionarioProps>(`/pessoas/${editarFuncionario}`).then(response => {
            console.log(response.data);
            setDetalheFuncionario(response.data);
        });
    }, [editarFuncionario]);

    // Função que Formata o resultado em valor monetario padrão pt-BR
    function formataValorMonetario(salarioBase: number, aliquota: number, parcelaDeduzir: number) {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format((salarioBase * aliquota) - parcelaDeduzir)
    }

    // Calcula valor do Desconto IRRF
    function calculaDescontoIRRF(salarioBaseIR: number) {
        if (salarioBaseIR < 1903.98) {
            return new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL'
            }).format(0);

        } else if (salarioBaseIR >= 1903.99 && salarioBaseIR <= 2826.65) {
            return formataValorMonetario(salarioBaseIR, 0.075, 142.80);

        } else if (salarioBaseIR >= 2826.66 && salarioBaseIR <= 3751.05) {
            return formataValorMonetario(salarioBaseIR, 0.150, 354.80);

        } else if (salarioBaseIR >= 3751.06 && salarioBaseIR <= 4664.68) {
            return formataValorMonetario(salarioBaseIR, 0.225, 636.13);

        } else if (salarioBaseIR > 4664.68) {
            return formataValorMonetario(salarioBaseIR, 0.275, 869.36);

        }
    }

    // Remova um Funcionário da listagem pelo ID
    function handleRemoverFuncionario(id: number) {
        const filtroFuncionario = funcionarios.filter(funcionario => funcionario.id !== id);
        setFuncionarios(filtroFuncionario);
        toast.success('Funcionário excluido com sucesso')
        return;
    }

    // Abrir modal Editar Funcionário
    function handleOpenModalEditarFuncionario(id: number) {
        setEditarFuncionario(id);
        openModal();
    }

    // Colunas da Tabela de Funcionários
    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Nome',
            dataIndex: 'nome',
            key: 'nome',
        },
        {
            title: 'CPF',
            dataIndex: 'cpf',
            key: 'cpf',
        },
        {
            title: 'Salário',
            dataIndex: 'salario',
            key: 'salario',
        },
        {
            title: 'Desconto',
            dataIndex: 'desconto',
            key: 'desconto',
        },
        {
            title: 'Dependentes',
            dataIndex: 'dependentes',
            key: 'dependentes',
        },
        {
            title: 'Desconto IRRF',
            dataIndex: 'descontoirrf',
            key: 'descontoirrf',
        },
        {
            title: 'Ações',
            dataIndex: 'acoes',
            key: 'acoes',
            render: (text: any, record: any) => (
                <Col className={style.colBotoes}>
                    <Button type='primary' onClick={() => handleOpenModalEditarFuncionario(record.id)}>
                        {"Editar"}
                    </Button>
                    <Button type="primary" danger onClick={() => handleRemoverFuncionario(record.id)}>
                        {"Excluir"}
                    </Button>
                </Col>
            ),
        }
    ];

    // Inserindo informações nas colunas da tabela
    const data = funcionarios.map(row => ({
        id: row.id,
        nome: row.nome,
        cpf: row.cpf,
        salario: new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(row.salario),
        desconto: new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(row.desconto),
        dependentes: row.dependentes,
        descontoirrf: calculaDescontoIRRF(row.salario - row.desconto - (deducaoDependente * row.dependentes))
    }))

    return (
        <section className={style.container}>
            <Row className={style.rowTitle}>
                <h1>Tabelas e cálculos de IRRF</h1>
            </Row>
            <Row className={style.mensagem}>
                <p>A tabela de IR é um dos principais instrumentos para auxiliar os contribuintes na hora de enviar as informações fiscais para a Receita. Afinal, é nesse documento que consta as alíquotas do Imposto de Renda.</p>
                <p>Isso quer dizer que é essa a fonte para você saber qual é o percentual que deve ser aplicado sobre os seus rendimentos. Portanto, na hora de fazer o cálculo e declarar seus rendimentos, ter essa tabela é fundamental para que você não envie nenhum dado errado e, consequentemente, não caia na malha fina.</p>
                <p>Veja a Tabela progressiva do IRRF que deve ser utilizada.
                    <Popover className={style.popover} content={content} trigger="hover">
                        <Button>aqui</Button>
                    </Popover>
                </p>
            </Row>
            <Row className={style.tabelaFuncionario}>
                <NovoFuncionario />
                <Table className={style.table} columns={columns} dataSource={data} size="middle" />
            </Row>

            <Row>
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    style={customStyles}
                >
                    {/* <EditarFuncionario onOpenNewTransactionModal={openModal} /> */}
                    <CloseOutlined style={{ float: 'right' }} onClick={closeModal} />
                    <Form
                        layout="vertical"
                        form={form}>
                        <h1>Editar Funcionário</h1>
                        <strong>Id: #{detalheFuncionario.id}</strong> - {detalheFuncionario.nome}
                        <Divider />
                        <Row gutter={10}>
                            <Col span={12}>
                                <Form.Item
                                    label="Nome"
                                    required={true}
                                >
                                    <Input type="text" name="nome" value={detalheFuncionario?.nome} placeholder="Nome" />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="CPF"
                                    required={true}
                                >
                                    <Input type="text" value={detalheFuncionario?.cpf} placeholder="CPF" required />
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row gutter={10}>
                            <Col span={8}>
                                <Form.Item
                                    label="Salário"
                                    required={true}
                                >
                                    <Input type="number" value={detalheFuncionario?.salario} placeholder="Salário Bruto" required />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    label="Desconto"
                                    required={true}
                                >
                                    <Input type="number" value={detalheFuncionario?.desconto} placeholder="Desconto" required />
                                </Form.Item>
                            </Col>
                            <Col span={8}>
                                <Form.Item
                                    label="Dependentes"
                                    required={true}
                                >
                                    <Input type="number" value={detalheFuncionario?.dependentes} placeholder="Dependentes" required />
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
        </section>
    )
}