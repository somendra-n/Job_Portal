import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Edit2, MoreHorizontal } from 'lucide-react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const CompaniesTable = () => {
    const { companies = [], searchCompanyByText } = useSelector(store => store.company);
    const [filterCompany, setFilterCompany] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const filteredCompany = companies.length > 0 && companies.filter((company) => {
            if (!searchCompanyByText) {
                return true;
            }
            return company?.name?.toLowerCase().includes(searchCompanyByText.toLowerCase());
        });
        setFilterCompany(filteredCompany || []);  // Ensure filteredCompany is an array
    }, [companies, searchCompanyByText]);

    return (
        <div className="bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <Table>
                <TableCaption className="text-white">A list of your recent registered companies</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-white">Logo</TableHead>
                        <TableHead className="text-white">Name</TableHead>
                        <TableHead className="text-white">Date</TableHead>
                        <TableHead className="text-right text-white">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {
                        filterCompany.length > 0 ? filterCompany.map((company) => (
                            <TableRow key={company._id} className="hover:bg-gray-700 transition-colors duration-200">
                                <TableCell>
                                    <Avatar>
                                        <AvatarImage src={company.logo} alt={`${company.name} logo`} />
                                    </Avatar>
                                </TableCell>
                                <TableCell className="text-white">{company.name}</TableCell>
                                <TableCell className="text-white">{new Date(company.createdAt).toLocaleDateString()}</TableCell>
                                <TableCell className="text-right cursor-pointer">
                                    <Popover>
                                        <PopoverTrigger>
                                            <MoreHorizontal className="text-white" />
                                        </PopoverTrigger>
                                        <PopoverContent className="w-32 bg-gray-900 text-white">
                                            <div onClick={() => navigate(`/admin/companies/${company._id}`)} className='flex items-center gap-2 w-fit cursor-pointer'>
                                                <Edit2 className='w-4' />
                                                <span>Edit</span>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                </TableCell>
                            </TableRow>
                        )) : (
                            <TableRow>
                                <TableCell colSpan={4} className="text-center text-white">No companies found</TableCell>
                            </TableRow>
                        )
                    }
                </TableBody>
            </Table>
        </div>
    );
}

export default CompaniesTable;
