import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Badge } from "../ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import {
  Search,
  Calendar,
  Filter,
  Edit,
  Trash2,
  UserCheck,
  AlertCircle,
  CheckCircle2,
  Clock,
} from "lucide-react";

interface Appointment {
  id: string;
  customerName: string;
  serviceType: string;
  date: string;
  time: string;
  status: "scheduled" | "completed" | "cancelled" | "in-progress";
  technicianAssigned?: string;
  address: string;
  contactNumber: string;
}

const AppointmentManagement = ({ appointments = mockAppointments }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);

  // Filter appointments based on search term and status
  const filteredAppointments = appointments.filter((appointment) => {
    const matchesSearch =
      appointment.customerName
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      appointment.id.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || appointment.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleStatusChange = (
    appointmentId: string,
    newStatus: "scheduled" | "completed" | "cancelled" | "in-progress",
  ) => {
    // In a real app, this would update the status in the database
    console.log(
      `Changing status of appointment ${appointmentId} to ${newStatus}`,
    );
  };

  const handleAssignTechnician = (
    appointmentId: string,
    technicianName: string,
  ) => {
    // In a real app, this would assign the technician in the database
    console.log(
      `Assigning technician ${technicianName} to appointment ${appointmentId}`,
    );
    setIsAssignDialogOpen(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "scheduled":
        return (
          <Badge className="bg-blue-500">
            <Clock className="w-3 h-3 mr-1" /> Scheduled
          </Badge>
        );
      case "completed":
        return (
          <Badge className="bg-green-500">
            <CheckCircle2 className="w-3 h-3 mr-1" /> Completed
          </Badge>
        );
      case "cancelled":
        return (
          <Badge className="bg-red-500">
            <AlertCircle className="w-3 h-3 mr-1" /> Cancelled
          </Badge>
        );
      case "in-progress":
        return (
          <Badge className="bg-yellow-500">
            <UserCheck className="w-3 h-3 mr-1" /> In Progress
          </Badge>
        );
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md w-full">
      <h1 className="text-2xl font-bold mb-6">Appointment Management</h1>

      <Tabs defaultValue="all" className="w-full mb-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="all" onClick={() => setStatusFilter("all")}>
            All
          </TabsTrigger>
          <TabsTrigger
            value="scheduled"
            onClick={() => setStatusFilter("scheduled")}
          >
            Scheduled
          </TabsTrigger>
          <TabsTrigger
            value="in-progress"
            onClick={() => setStatusFilter("in-progress")}
          >
            In Progress
          </TabsTrigger>
          <TabsTrigger
            value="completed"
            onClick={() => setStatusFilter("completed")}
          >
            Completed
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="flex items-center gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by customer name or ID..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="h-4 w-4" />
        </Button>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableCaption>List of all appointments</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Service Type</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Technician</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAppointments.length > 0 ? (
              filteredAppointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell className="font-medium">
                    {appointment.id}
                  </TableCell>
                  <TableCell>{appointment.customerName}</TableCell>
                  <TableCell>{appointment.serviceType}</TableCell>
                  <TableCell>{`${appointment.date} at ${appointment.time}`}</TableCell>
                  <TableCell>{getStatusBadge(appointment.status)}</TableCell>
                  <TableCell>
                    {appointment.technicianAssigned || "Not assigned"}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelectedAppointment(appointment);
                          setIsDetailsOpen(true);
                        }}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          setSelectedAppointment(appointment);
                          setIsAssignDialogOpen(true);
                        }}
                      >
                        <UserCheck className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center py-6 text-muted-foreground"
                >
                  No appointments found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Appointment Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Appointment Details</DialogTitle>
            <DialogDescription>
              View and update appointment information
            </DialogDescription>
          </DialogHeader>

          {selectedAppointment && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium">Customer</h3>
                  <p className="text-sm">{selectedAppointment.customerName}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Service Type</h3>
                  <p className="text-sm">{selectedAppointment.serviceType}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Date</h3>
                  <p className="text-sm">{selectedAppointment.date}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Time</h3>
                  <p className="text-sm">{selectedAppointment.time}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Status</h3>
                  <Select defaultValue={selectedAppointment.status}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                      <SelectItem value="in-progress">In Progress</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Technician</h3>
                  <p className="text-sm">
                    {selectedAppointment.technicianAssigned || "Not assigned"}
                  </p>
                </div>
                <div className="col-span-2">
                  <h3 className="text-sm font-medium">Address</h3>
                  <p className="text-sm">{selectedAppointment.address}</p>
                </div>
                <div className="col-span-2">
                  <h3 className="text-sm font-medium">Contact Number</h3>
                  <p className="text-sm">{selectedAppointment.contactNumber}</p>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDetailsOpen(false)}>
              Cancel
            </Button>
            <Button>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Assign Technician Dialog */}
      <Dialog open={isAssignDialogOpen} onOpenChange={setIsAssignDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Assign Technician</DialogTitle>
            <DialogDescription>
              Assign a technician to this appointment
            </DialogDescription>
          </DialogHeader>

          {selectedAppointment && (
            <div className="grid gap-4 py-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Appointment</h3>
                <p className="text-sm">
                  {selectedAppointment.serviceType} - {selectedAppointment.date}{" "}
                  at {selectedAppointment.time}
                </p>
                <p className="text-sm mt-1">{selectedAppointment.address}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-2">Select Technician</h3>
                <Select
                  defaultValue={selectedAppointment.technicianAssigned || ""}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a technician" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="John Doe">John Doe</SelectItem>
                    <SelectItem value="Jane Smith">Jane Smith</SelectItem>
                    <SelectItem value="Mike Johnson">Mike Johnson</SelectItem>
                    <SelectItem value="Sarah Williams">
                      Sarah Williams
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAssignDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={() =>
                selectedAppointment &&
                handleAssignTechnician(selectedAppointment.id, "John Doe")
              }
            >
              Assign
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

// Mock data for appointments
const mockAppointments: Appointment[] = [
  {
    id: "APT-001",
    customerName: "John Smith",
    serviceType: "AC Installation",
    date: "2023-07-15",
    time: "10:00 AM",
    status: "scheduled",
    address: "123 Main St, Anytown, CA 12345",
    contactNumber: "(555) 123-4567",
  },
  {
    id: "APT-002",
    customerName: "Emily Johnson",
    serviceType: "AC Maintenance",
    date: "2023-07-16",
    time: "2:30 PM",
    status: "completed",
    technicianAssigned: "Mike Johnson",
    address: "456 Oak Ave, Somewhere, CA 12345",
    contactNumber: "(555) 987-6543",
  },
  {
    id: "APT-003",
    customerName: "Robert Williams",
    serviceType: "AC Repair",
    date: "2023-07-17",
    time: "9:00 AM",
    status: "in-progress",
    technicianAssigned: "Jane Smith",
    address: "789 Pine Rd, Nowhere, CA 12345",
    contactNumber: "(555) 456-7890",
  },
  {
    id: "APT-004",
    customerName: "Sarah Davis",
    serviceType: "AC Installation",
    date: "2023-07-18",
    time: "1:00 PM",
    status: "cancelled",
    address: "321 Elm St, Anytown, CA 12345",
    contactNumber: "(555) 234-5678",
  },
  {
    id: "APT-005",
    customerName: "Michael Brown",
    serviceType: "AC Maintenance",
    date: "2023-07-19",
    time: "11:30 AM",
    status: "scheduled",
    address: "654 Maple Dr, Somewhere, CA 12345",
    contactNumber: "(555) 876-5432",
  },
];

export default AppointmentManagement;
