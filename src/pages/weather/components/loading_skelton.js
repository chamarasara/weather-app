import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

const PageSkeleton = () => {
    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 mt-5'>
                    <h1><Skeleton width={200} height={30} /></h1>
                    <Skeleton count={1} height={15} width={400} />
                    <div className=" mt-3">
                        <Skeleton width={550} height={200} />
                    </div>
                    <div className='row mt-5'>
                        <div className='col-md-4'>
                            <Skeleton width={100} height={100} />
                        </div>
                        <div className='col-md-4'>
                            <Skeleton width={100} height={100} />
                        </div>
                        <div className='col-md-4'>
                            <Skeleton width={100} height={100} />
                        </div>
                    </div>
                </div>
                <div className='col-md-6 mt-5'>
                    <div className='p-4 m-4'>
                        <table className="table ">
                            <tbody>
                                <tr>
                                    <td><Skeleton width={500} height={20} /></td>
                                </tr>
                                <tr>
                                    <td><Skeleton width={500} height={20} /></td>
                                </tr>
                                <tr>
                                    <td><Skeleton width={500} height={20} /></td>
                                </tr>
                                <tr>
                                    <td><Skeleton width={500} height={20} /></td>
                                </tr>
                                <tr>
                                    <td><Skeleton width={500} height={20} /></td>
                                </tr>
                                <tr>
                                    <td><Skeleton width={500} height={20} /></td>
                                </tr>
                                <tr>
                                    <td><Skeleton width={500} height={20} /></td>
                                </tr>
                                <tr>
                                    <td><Skeleton width={500} height={20} /></td>
                                </tr>
                                <tr>
                                    <td><Skeleton width={500} height={20} /></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PageSkeleton;
