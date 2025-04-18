import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { APPLICATION_API_END_POINT } from '@/utils/constant';
import axios from 'axios';

const shortlistingStatus = ["Accepted", "Rejected"];

const ApplicantsTable = () => {
    const { applicants } = useSelector(store => store.application);

    const statusHandler = async (status, id) => {
        try {
            axios.defaults.withCredentials = true;
            const res = await axios.post(`${APPLICATION_API_END_POINT}/status/${id}/update`, { status });
            if (res.data.success) {
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }

    return (
        <div>
            <Table className="bg-gray-800 text-white">
                <TableCaption>A list of your recent applied users</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>Full Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Contact</TableHead>
                        <TableHead>Resume</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {applicants && applicants.applications.map((item) => (
                        <TableRow key={item._id} className="hover:bg-gray-700">
                            <TableCell>{item.applicant?.fullname}</TableCell>
                            <TableCell>{item.applicant?.email}</TableCell>
                            <TableCell>{item.applicant?.phoneNumber}</TableCell>
                            <TableCell>
                                {item.applicant?.profile?.resume ? (
                                    <a
                                        className="text-blue-400 hover:underline"
                                        href={item.applicant.profile.resume}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {item.applicant.profile.resumeOriginalName}
                                    </a>
                                ) : (
                                    <span className="text-gray-500">NA</span>
                                )}
                            </TableCell>
                            <TableCell>{new Date(item.applicant.createdAt).toLocaleDateString()}</TableCell>
                            <TableCell className="text-right cursor-pointer">
                                <Popover>
                                    <PopoverTrigger>
                                        <MoreHorizontal className="text-gray-400 hover:text-white" />
                                    </PopoverTrigger>
                                    <PopoverContent className="w-32 bg-gray-700 text-white">
                                        {shortlistingStatus.map((status, index) => (
                                            <div
                                                onClick={() => statusHandler(status, item._id)}
                                                key={index}
                                                className='flex w-fit items-center my-2 cursor-pointer hover:bg-gray-600 rounded'
                                            >
                                                <span>{status}</span>
                                            </div>
                                        ))}
                                    </PopoverContent>
                                </Popover>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}

export default ApplicantsTable;
