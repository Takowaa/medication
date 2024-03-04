import {useEffect, useState} from "react";
import {useAppDispatch, RootState} from "./store/store.tsx";
import {
    medicationListAction,
    medicationListAdd,
    medicationListDelete,
    medicationListUpdate
} from "./store/slice/action.tsx";
import {useSelector} from "react-redux";
import {Button, Flex, Input, Modal, Table} from "antd";
import TextArea from "antd/es/input/TextArea";
import {useForm, SubmitHandler, Controller} from "react-hook-form"
import {yupResolver} from "@hookform/resolvers/yup"
import * as yup from "yup"
import {DeleteOutlined} from "@ant-design/icons";
import {Medication} from "./store/slice/slice.tsx";



type Inputs = {
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
            render: (value:number, row: Medication)=> {

                return (
                    <>
                        {/*<button onClick={() => dispatch(medicationListUpdate({*/}
                        {/*        id: row.id,*/}
                        {/*        performed: row.performed - 1*/}
                        {/*    })*/}
                        {/*)}>-*/}
                        {/*</button>*/}
                        <span>{value}</span>
                        {/*<button onClick={() => dispatch(medicationListUpdate({*/}
                        {/*        id: row.id,*/}
                        {/*        performed: row.performed + 1*/}
                        {/*    })*/}
                        {/*)}>+*/}
                        {/*</button>*/}
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
            render: (_:undefined, row: Medication)=> {

                return <button onClick={()=> dispatch(medicationListDelete(row.id))}><DeleteOutlined /></button>
            }
        }
    ];


    const {
        handleSubmit,
        control,
        reset,
        formState: {errors},
    } = useForm<Inputs>({
        resolver: yupResolver(schema),
    })
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
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
                <Modal title="Basic Modal" open={isModalOpen} onOk={handleSubmit(onSubmit)} onCancel={handleCancel}>

                    <label htmlFor="name">*Name</label>
                    <Controller
                        name="name"
                        control={control}
                        render={({field}) => <Input {...field} />}
                    />
                    {errors.name && <p>{errors.name.message}</p>}
                    <label htmlFor="description">*Description</label>
                    <Controller
                        name="description"
                        control={control}
                        render={({field}) => <TextArea  rows={4} {...field}/>}
                    />

                    <label htmlFor="count">*Count</label>
                    <Controller
                        name="performed"
                        control={control}
                        render={({field}) => <Input {...field} />}
                    />
                    {errors.performed && <p>{errors.performed.message}</p>}
                    <label htmlFor="destination">*Destination</label>
                    <Controller
                        name="destination"
                        control={control}
                        render={({field}) => <Input {...field} />}
                    />
                    {errors.destination && <p>{errors.destination.message}</p>}

                </Modal>
            </Flex>
            <Table dataSource={medications} columns={columns}/>
        </>
    )
}

export default App
