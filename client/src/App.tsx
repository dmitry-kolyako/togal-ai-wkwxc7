import {MainPage} from "./pages/MainPage/MainPage.tsx";
import {ApiConfig} from "../../shared/config/api.config.ts";
import {ApiServiceV1} from "./services/ApiService.ts";
import {ImageProvider} from "./context";
import {LoadingOverlay} from "./components/LoadingOverlay/LoadingOverlay.tsx";

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
