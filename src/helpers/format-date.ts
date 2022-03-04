    const formatDate = (date: Date = new Date()): string => {
        return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`
    }

    export default formatDate