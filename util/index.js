module.exports = {
    handleDataToReturn(data) {
        return {success: true, data: data.rows || data, dataCount: data?.count}
    },
}