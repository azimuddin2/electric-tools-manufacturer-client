const { useEffect } = require("react")

const useTitle = (title) => {
    useEffect(() => {
        document.title = `${title} - Autozpro`;
    }, [title])
}

export default useTitle;