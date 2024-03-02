import {useEffect, useState} from "react";
import { useAppDispatch,RootState} from "./store/store.tsx";
import {medicationListAction} from "./store/slice/action.tsx";
import {useSelector} from "react-redux";
import {Button, Flex, Input, Modal, Table} from "antd";
import TextArea from "antd/es/input/TextArea";

const columns = [
  {
    title: "name",
    dataIndex: "name",
    key: "name",
  },
  {
    title: "description",
    dataIndex: "description",
    key: "description",

  },
  {
    title: "performed",
    dataIndex: "performed",
    key: "performed",

  },
  {
    title: "target",
    dataIndex: "target",
    key: "target",

  },
];
function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const dispatch = useAppDispatch()
  const medications = useSelector((store: RootState) => store.medication.medication)


  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

useEffect(()=>{
  dispatch(medicationListAction())
},[dispatch])

  useEffect(() => {
    console.log(medications, "медикаменты");
  }, [medications]);
  return (
    <>
      <Flex justify={"space-between"}>
        <h2>Medication List</h2>
        <Button type="primary" onClick={showModal}>
         + Add medication
        </Button>
        <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <label htmlFor="name">*Name</label>
        <Input  id="name" />
          <label htmlFor="description">*Description</label>
          <TextArea id="description" rows={4} />
          <label htmlFor="count">*Count</label>
          <Input type='number' id='count'/>
          <label htmlFor="destination">*Destination</label>
          <Input id='destination'/>
        </Modal>
      </Flex>
      <Table dataSource={medications} columns={columns} />
    </>
  )
}

export default App
