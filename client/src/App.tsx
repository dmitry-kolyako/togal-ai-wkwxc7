import {MainPage} from "./pages/MainPage/MainPage.tsx";
import {ApiConfig} from "../../shared/config/api.config.ts";
import {ApiServiceV1} from "./services/ApiService.ts";
import {ImageProvider} from "./context";

const api = ApiServiceV1.getInstance(ApiConfig);

function App() {

    return (
        <>
            <ImageProvider ApiService={api}>
                <MainPage/>
            </ImageProvider>
        </>
    )
}

export default App
