

const WithdrawList = () => {
    return (
        <div className="ml-2 mt-2 p-5 w-100 rounded">
            {/* <style>{`
               .uniform-table {
    width: 100%;
    table-layout: fixed;
}

.uniform-table th, .uniform-table td {
    padding: 15px;
    text-align: left;
    border-bottom: 1px solid #ddd;
}
            `}</style> */}
            <h1 className="">Withdraw List</h1>
            <div className="table-responsive mt-5">
                <table className="table table-striped uniform-table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Date</th>
                            <th scope="col">Amount</th>
                            <th scope="col">Account Number</th>
                            <th scope="col">Withdraw ID</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row">1</th>
                            <td>01-05-2024</td>
                            <td>500TK</td>
                            <td>01675440454</td>
                            <td>#5151561</td>
                        </tr>
                        <tr>
                            <th scope="row">2</th>
                            <td>01-05-2024</td>
                            <td>500TK</td>
                            <td>01675440454</td>
                            <td>#5151561</td>
                        </tr>
                        <tr>
                            <th scope="row">3</th>
                            <td>01-05-2024</td>
                            <td>500TK</td>
                            <td>01675440454</td>
                            <td>#5151561</td>
                        </tr>
                        <tr>
                            <th scope="row"></th>
                            <td>01-05-2024</td>
                            <td>500TK</td>
                            <td>01675440454</td>
                            <td>#5151561</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default WithdrawList;