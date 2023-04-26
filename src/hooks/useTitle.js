const { useEffect } = require("react")

const useTitle = (title) => {
    useEffect(() => {
        document.title = `${title} - Doctors Portal`;
    }, [title])
}

export default useTitle;