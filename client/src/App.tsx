import {MainPage} from "./pages/MainPage/MainPage.tsx";
import {ApiConfig} from "../../shared/config/api.config.ts";

import {ImageProvider} from "./context";
import {ApiServiceV1} from "./services";
import {LoadingOverlay} from "./components";

const api = ApiServiceV1.getInstance(ApiConfig);

function App() {

    return (
        <>
            <ImageProvider ApiService={api}>
                <MainPage/>
                <LoadingOverlay />
            </ImageProvider>
        </>
    )
}

export default App
