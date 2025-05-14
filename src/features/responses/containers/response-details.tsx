import { useGetResponse } from "../api/use-get-response"

export const ResponseDetails = () => {
    const {response} = useGetResponse()
    console.log(response)
    return (
        <div>
            <p>Hello!</p>
        </div>
    )
}