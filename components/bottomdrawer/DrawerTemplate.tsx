'use client';
import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
  onDelete: () => void;
  onEdit: () => void;
}

export default function DrawerTemplate ({ children, onDelete, onEdit }: Props) {
    return (
        <div className="stacked">
            <div className="">{children}</div>
            <div className="w-full spaced">
                <button type="button" onClick={onDelete} className="normal-space rounded-full bg-surface-1 cursor-pointer text-error w-20 hover:bg-surface-2">Delete</button>
                <button type="button" onClick={onEdit} className="normal-space rounded-full bg-surface-1 cursor-pointer text-main w-20 hover:bg-surface-2">Edit</button>
            </div>
        </div>
    );
}