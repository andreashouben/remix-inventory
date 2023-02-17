import { Form, Link } from "@remix-run/react";
import { Button } from "~/components/button/button";
import React from "react";

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
    <Form
      className="inline"
      method="delete"
      action={`/container/${containerId}`}
    >
      {containerName} (Items: {itemCount}) (Container: {containerCount})
      <Link to={`/container/${containerId}`}>
        <Button>Open Container</Button>
      </Link>
      <Button>Delete Container</Button>
    </Form>
  );
}
