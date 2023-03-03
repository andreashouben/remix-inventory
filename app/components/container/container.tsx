import { Form, Link } from "@remix-run/react";
import { IconButton } from "~/components/button/iconButton";
import React from "react";
import { FolderMinusIcon, FolderOpenIcon } from "@heroicons/react/20/solid";

type ContainerProps = {
  containerName: string;
  containerId: number;
  itemCount: number;
  containerCount: number;
};

export function Container({
  containerId,
  containerName,
  itemCount,
  containerCount,
}: ContainerProps) {
  return (
    <div className="flex justify-between">
      <div className="flex grow justify-between">
        <div className="flex items-center">
          <Link to={`/container/${containerId}`} className="mr-3">
            <IconButton label="Open Container">
              <FolderOpenIcon />
            </IconButton>
          </Link>
          {containerName}
        </div>
        <div className="mr-3 flex grow items-center justify-end gap-2">
          <span>Items: {itemCount}</span>
          <span className="w-[90px]">Container: {containerCount}</span>
        </div>
      </div>
      <div>
        <Form
          method="post"
          action={`/container/${containerId}`}
          className="text-red tooltip"
          data-tip="Delete Container"
        >
          <IconButton label="Delete Container" name="_action" value="delete">
            <FolderMinusIcon />
          </IconButton>
        </Form>
      </div>
    </div>
  );
}
