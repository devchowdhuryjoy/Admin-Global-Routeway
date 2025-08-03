import React, { useEffect, useState } from "react";
import BASE_URL from "../../ApiBaseUrl/BaseUrl";
import Swal from "sweetalert2";

const UserList = () => {
  // State declarations first
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  // Fetch users from API
  const fetchUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${BASE_URL}registrations`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch users");
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Delete user handler
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This user will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#1e40af",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        // ✅ Custom DELETE API logic inside the function
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const userToDelete = users.find((user) => user.id === id);

        const raw = JSON.stringify({
          firstName: userToDelete?.first_name,
          lastName: userToDelete?.last_name,
          email: userToDelete?.email,
          phone: userToDelete?.phone,
          nearestOffice: userToDelete?.nearest_office,
          preferredDestination: userToDelete?.preferred_destination,
          testStatus: userToDelete?.test_status,
          fundingPlan: userToDelete?.funding_plan,
        });

        const response = await fetch(`${BASE_URL}registrationsdelete/${id}`, {
          method: "DELETE",
          headers: myHeaders,
          body: raw,
        });

        if (!response.ok) throw new Error("Failed to delete user");

        setUsers((prev) => prev.filter((user) => user.id !== id));

        // Adjust current page if needed
        const newTotalPages = Math.ceil((users.length - 1) / itemsPerPage);
        if (currentPage > newTotalPages) setCurrentPage(newTotalPages);

        Swal.fire({
          title: "Deleted!",
          text: "User has been deleted successfully.",
          icon: "success",
          confirmButtonColor: "#1e40af",
        });
      } catch (err) {
        Swal.fire({
          title: "Error!",
          text: "Failed to delete user.",
          icon: "error",
          confirmButtonColor: "#1e40af",
        });
      }
    }
  };

  const totalPages = Math.ceil(users.length / itemsPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = users.slice(startIndex, startIndex + itemsPerPage);

  // Render loading or error if needed
  if (loading)
    return (
      <div className="p-6 text-center text-gray-600">Loading users...</div>
    );

  if (error)
    return <div className="p-6 text-center text-red-600">Error: {error}</div>;

  // Main return
  return (
    <div className="p-10 font-poppins">
      <div>
        {/* Searchbar (optional) */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-4xl font-semibold text-black-600 text-[#f16f22] pl-5">
            Register List
          </h3>
          {/* Add your search form here if needed */}
          <form className="max-w-md w-full pr-5">
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <input
                type="search"
                id="default-search"
                className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search Users..."
                required
              />
              <button
                type="submit"
                className="text-white absolute right-2.5 bottom-2.5 bg-[#f16f22] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-[#f16f22] dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Search
              </button>
            </div>
          </form>
        </div>

        {/* Table */}
        <table className="min-w-full border border-gray-300 rounded-md">
          <thead className="bg-gray-100">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">ID</th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Name
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Email
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Phone
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Nearest Office
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Preferred Destination
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Test Status
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Funding Plan
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Agreed To Terms
              </th>
              <th className="border border-gray-300 px-4 py-2 text-left">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {currentItems.length === 0 ? (
              <tr>
                <td
                  colSpan="10"
                  className="text-center py-4 text-gray-500 italic"
                >
                  No users found.
                </td>
              </tr>
            ) : (
              currentItems.map((user) => (
                <tr
                  key={user.id}
                  className="odd:bg-white even:bg-gray-50 hover:bg-gray-100"
                >
                  <td className="border border-gray-300 px-4 py-2">
                    {user.id}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{`${user.first_name} ${user.last_name}`}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user.email}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user.phone}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user.nearest_office}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user.preferred_destination}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user.test_status}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {user.funding_plan}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    {user.agreed_to_terms ? "✔️" : "❌"}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 text-center">
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="bg-[#1e40af] hover:bg-blue-800 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-center mt-4">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => handlePageChange(i + 1)}
              className={`px-4 py-2 mx-1 rounded ${
                currentPage === i + 1
                  ? "bg-[#f16f22] text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserList;
