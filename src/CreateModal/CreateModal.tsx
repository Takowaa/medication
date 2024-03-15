import { Input, Modal} from "antd";
import { Controller, SubmitHandler } from "react-hook-form";
import {MedicationFormData} from "../App.tsx";

const { TextArea } = Input;





interface CreateModalProps {
    isModalOpen: boolean;
    handleCancel: () => void;
    handleSubmit: (data: Object, e?: Event) => Promise<void>;
    control: any;
    errors: any;
    // onSubmit:  SubmitHandler<MedicationFormData>;
}

const CreateModal: React.FC<CreateModalProps> = ({
    isModalOpen,
    handleCancel,
    handleSubmit,
    control,
    errors,
    // onSubmit,
}) => {
    return (
        <>
            <Modal title="Basic Modal" open={isModalOpen} onOk={() => handleSubmit(onSubmit)} onCancel={handleCancel}>

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
                    render={({field}) => <TextArea rows={4} {...field}/>}
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
        </>
    );
};

export default CreateModal;