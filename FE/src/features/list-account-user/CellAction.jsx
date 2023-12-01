import { Tooltip } from "@nextui-org/react";
import { Trash2 } from 'lucide-react';

const CellAction = () => {
    return (
        <Tooltip color="danger" content="Delete user">
            <span className="text-lg text-danger cursor-pointer active:opacity-50">
                <Trash2 size={16} />
            </span>
        </Tooltip>
    )
}

export default CellAction
