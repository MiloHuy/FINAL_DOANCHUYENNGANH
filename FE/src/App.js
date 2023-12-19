import { Spinner } from "@nextui-org/react";
import { NextUIProvider } from "@nextui-org/system";
import FieldUpload from "components/field-upload";
import Authen from "pages/authen";
import CreateAccount from "pages/create-account";
import CreateTopic from "pages/create-topic";
import DetailUser from "pages/detail-user";
import HomeUser from "pages/home-user";
import Layout from "pages/layout";
import ListAccount from "pages/list-account";
import ListTopics from "pages/list-topics";
import Main from "pages/main";
import ManageAccount from "pages/manage-account";
import { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";

const LazyLoadingAdmin = lazy(() => import("pages/admin"));
const LazyLoadingUser = lazy(() => import("pages/user"));

function App() {
  return (
    <NextUIProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Main />} />
          <Route path="login" element={<Authen />} />
          <Route path="upload" element={<FieldUpload />} />

          <Route
            path="admin"
            element={
              <Suspense
                fallback={
                  <div className="w-full h-full flex items-center justify-center font-merriweather">
                    <Spinner size="lg" label="Loading" color="default" />
                  </div>
                }
              >
                <LazyLoadingAdmin />
              </Suspense>
            }
          >
            <Route path="manage_account" element={<ManageAccount />} />
            <Route path="create" element={<CreateAccount />} />
            <Route path="list" element={<ListAccount />} />
            <Route path="set_password" element={<ManageAccount />} />
          </Route>

          <Route
            path="users"
            element={
              <Suspense
                fallback={<Spinner size="lg" label="Loading" color="default" />}
              >
                <LazyLoadingUser />
              </Suspense>
            }
          >
            <Route index path="user/home" element={<HomeUser />} />
            <Route index path="user/details" element={<DetailUser />} />
            <Route index path="user/list" element={<ListTopics />} />
            <Route index path="user/create" element={<CreateTopic />} />
          </Route>
        </Route>
      </Routes>
    </NextUIProvider>
  );
}

export default App;
