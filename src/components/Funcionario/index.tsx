import { useEffect, useState } from 'react';

import { Row, Table, Button, Col } from 'antd';

import { api } from '../../services/api';

import style from './style.module.scss';
import NovoFuncionario from '../NovoFuncionario';

interface FuncionarioProps {
    id: number;
    nome: string;
    cpf: number;
    salario: number;
    desconto: number;
    dependentes: number;
    descontoirrf: number;
}

interface NovoFuncionarioProps {
    id: number;
    nome: string;
    cpf: number;
    salario: number;
    desconto: number;
    dependentes: number;
}

export default function Funcionario() {
    const [funcionarios, setFuncionarios] = useState<FuncionarioProps[]>([]);
    var deducaoDependente = 164.56;

    useEffect(() => {
        api.get<FuncionarioProps[]>(`/pessoas`).then(response => {
            setFuncionarios(response.data);
        });
    }, []);

    // Calcula valor do Desconto IRRF
    // function calculaDescontoIRRF(id: number) {
    //     funcionarios.map((e) => e.id === id){
    //         const salarioBaseIR = e.salario - e.desconto - (deducaoDependente * e.dependentes);
    //         var descontoirrf;

    //         if(salarioBaseIR < 1903.98){
    //             descontoirrf = 0;
    //         } else if(salarioBaseIR >= 1903.99 && salarioBaseIR <= 2826.65){
    //             descontoirrf = (salarioBaseIR * 7.5) - 142.80;
    //         } else if(salarioBaseIR >= 2826.66 && salarioBaseIR <= 3751.05){
    //             descontoirrf = (salarioBaseIR * 15) - 354.80;
    //         } else if(salarioBaseIR >= 3751.06 && salarioBaseIR <= 4664.68){
    //             descontoirrf = (salarioBaseIR * 22.5) - 636.13;
    //         } else if (salarioBaseIR > 4664.68){
    //             descontoirrf = (salarioBaseIR * 27.5) - 869.36;
    //         }
    //     });
    // }

    // console.log(calculaDescontoIRRF(1));

    // Remova um Funcionário da listagem pelo ID
    function handleRemoverFuncionario(id: number) {

        const filtroFuncionario = funcionarios.filter(funcionario => funcionario.id !== id);
        setFuncionarios(filtroFuncionario);
    }

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
                    <Button type='primary' onClick={() => console.log(record)}>
                        {"Editar"}
                    </Button>
                    <Button type="primary" danger onClick={() => handleRemoverFuncionario(record.id)}>
                        {"Excluir"}
                    </Button>
                </Col>
            ),
        }
    ];

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
        dependentes: row.dependentes

    }))

    return (
        <section className={style.container}>
            <Row className={style.rowTitle}>
                <h1>Tabelas e cálculos de IRRF</h1>
            </Row>
            <Row className={style.mensagem}>
                text
            </Row>
            <Row className={style.tabelaFuncionario}>
                <NovoFuncionario />
                <Table className={style.table} columns={columns} dataSource={data} size="middle" />
            </Row>
        </section>
    )
}