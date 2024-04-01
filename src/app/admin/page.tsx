import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Admin = async () => {
  const session = await getServerSession();
  if (!session) {
    redirect("/");
  }
  return (
    <div className="flex min-h-screen flex-col items-center justify-between p-24">
      Admin
    </div>
  );
};

export default Admin;
