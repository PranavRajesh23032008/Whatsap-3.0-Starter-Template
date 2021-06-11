import { CircularProgress } from "@material-ui/core"

const loading = () => {
    return (
        <div
            className={"rounded-sm text-center shadow-lg p-5"}
            style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translateX(-50%) translateY(-50%)"
            }}
        >
            <title>Loading</title>
            <img className={"cursor-pointer  h-52 w-52 "} src={"https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/479px-WhatsApp.svg.png"} />
            <CircularProgress
                style={{
                    marginTop: "30px",
                    marginBottom: "20px",
                    color: "#24CC63"
                }}
                size={50}
                thickness={4}
            />
        </div>
    )
}

export default loading
