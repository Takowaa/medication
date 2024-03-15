import {useEffect, useState} from "react";
import {useAppDispatch, RootState} from "./store/store.tsx";
import {
    medicationListAction,
    medicationListAdd,
    medicationListDelete,
    medicationListUpdate
} from "./store/slice/action.tsx";
import {useSelector} from "react-redux";
import {Button, Flex, Table} from "antd";
import {useForm, SubmitHandler} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import * as yup from "yup"
import {DeleteOutlined} from "@ant-design/icons";
import {Medication} from "./store/slice/slice.tsx";
import {Popconfirm} from 'antd';
import CreateModal from "./CreateModal";


export type MedicationFormData = {
    name: string
    description: string;
    performed: number
    destination: number
}
const schema = yup
    .object({
        name: yup.string().required(),
        performed: yup.number().required(),
        destination: yup.number().required(),
        description: yup.string().required()
    })
    .required()


function App() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useAppDispatch()
    const medications = useSelector((store: RootState) => store.medication.medication)

    const columns = [
        {
            title: "Id",
            dataIndex: "id",
            key: "id",
        },
        {
            title: "Name",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Description",
            dataIndex: "description",
            key: "description",

        },
        {
            title: "Performed",
            dataIndex: "performed",
            key: "performed",
            render: (value: number, row: Medication) => {
                const isButtonVisibile = value < row.destination

                return (
                    <>
                        <button onClick={() => {
                            if (value > 0) {
                                dispatch(medicationListUpdate({
                                        ...row,
                                        performed: row.performed - 1
                                    })
                                )
                            }
                        }
                        }>-
                        </button>
                        <span>{value}</span>
                        {isButtonVisibile && (<button onClick={() => dispatch(medicationListUpdate({
                                ...row,
                                performed: row.performed + 1
                            })
                        )}>+
                        </button>)}
                    </>
                )
            }

        },
        {
            title: "Destination",
            dataIndex: "destination",
            key: "destination",

        },
        {
            title: "Actions",
            dataIndex: "Actions",
            key: "actions",
            render: (_: undefined, row: Medication) => {
                return (
                    <Popconfirm
                        title="Are you sure you want to delete this medication?"
                        onConfirm={() => dispatch(medicationListDelete(row.id))}
                        okText="Yes"
                        cancelText="No"
                    >
                        <button><DeleteOutlined/></button>
                    </Popconfirm>
                )
            }
        }
    ];


    const {
        handleSubmit,
        control,
        reset,
        formState: {errors},
    } = useForm<MedicationFormData>({
        resolver: yupResolver(schema),
    })
    const onSubmit: SubmitHandler<MedicationFormData> = (data) => {
        dispatch(medicationListAdd(data))
        setIsModalOpen(false)
        reset()
    }
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

   const sortedTable = [...medications].sort((a) => {
        if (a.performed < a.destination) {
            return - 1
        }
        return  1
    })



    useEffect(() => {
        dispatch(medicationListAction())
    }, [dispatch])

    return (
        <>
            <Flex justify={"space-between"}>
                <h2>Medication List</h2>
                <Button type="primary" onClick={showModal}>
                    + Add medication
                 </Button>
               <CreateModal isModalOpen={isModalOpen}
                            handleCancel={handleCancel}
                            handleSubmit={handleSubmit(onSubmit)}
                            control={control}
                            errors={errors} />
            </Flex>
            <Table dataSource={sortedTable} columns={columns}/>
        </>
    )
}

export default App
