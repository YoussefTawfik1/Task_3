import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from '@mui/material/Button';
import Table from '@mui/material/Table';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';  
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const BlogList = () => { 
  const [blogs, setBlogs] = useState([]);
  const params = new URLSearchParams(window.location.search);
  const userId = params.get('userId');
  console.log(userId);

  const getBlogs = async () => {
    try {
      // Fix for axios template literal usage
      const response = await axios.get(`http://localhost:2000/filter?userId=${userId}`);
      setBlogs(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching blogs", error);
    }
  }

  return(
    <div className="BlogList">
      <Box sx={{marginBottom: 2}}>
        <Button 
          variant="contained" 
          onClick={getBlogs} 
          margin="normal" 
          padding="normal"
        >
          Load Blogs
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <TableHead>
            <TableRow>
              <StyledTableCell align="center">Title</StyledTableCell>
              <StyledTableCell align="center">Date</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {blogs.map((blog) => (
              <TableRow
                hover
                sx={{
                  "&:hover": {
                    cursor: "pointer",
                    backgroundColor: "#f5f5f5",
                    width: "100%"
                  }
                }}
                key={blog._id}
                // Fix for URL template literal usage
                onClick={() => window.location.href = `/blog/${blog._id}`}
              >
                <TableCell align="center">{blog.title}</TableCell>
                
                <TableCell align="center">{new Date(blog.createdAt).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default BlogList;
