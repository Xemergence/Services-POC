import React, { useState } from "react";
import { format } from "date-fns";
import {
  Calendar,
  Clock,
  MoreVertical,
  Edit,
  Trash2,
  AlertCircle,
} from "lucide-react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Appointment {
  id: string;
  date: Date;
  time: string;
  service: string;
  status: "scheduled" | "completed" | "cancelled";
  technician?: string;
  address: string;
  notes?: string;
}

interface AppointmentsListProps {
  appointments?: Appointment[];
  onReschedule?: (id: string) => void;
  onCancel?: (id: string) => void;
  onViewDetails?: (id: string) => void;
}

const getStatusColor = (status: Appointment["status"]) => {
  switch (status) {
    case "scheduled":
      return "secondary";
    case "completed":
      return "default";
    case "cancelled":
      return "destructive";
    default:
      return "secondary";
  }
};

const AppointmentsList = ({
  appointments = [
    {
      id: "1",
      date: new Date(Date.now() + 86400000 * 3), // 3 days from now
      time: "10:00 AM",
      service: "AC Installation",
      status: "scheduled",
      technician: "John Smith",
      address: "123 Main St, Anytown, USA",
      notes: "Please call 30 minutes before arrival.",
    },
    {
      id: "2",
      date: new Date(Date.now() + 86400000 * 7), // 7 days from now
      time: "2:30 PM",
      service: "AC Maintenance",
      status: "scheduled",
      technician: "Sarah Johnson",
      address: "456 Oak Ave, Anytown, USA",
    },
    {
      id: "3",
      date: new Date(Date.now() - 86400000 * 2), // 2 days ago
      time: "1:00 PM",
      service: "AC Repair",
      status: "completed",
      technician: "Mike Davis",
      address: "789 Pine Rd, Anytown, USA",
      notes: "Fixed refrigerant leak.",
    },
    {
      id: "4",
      date: new Date(Date.now() - 86400000 * 5), // 5 days ago
      time: "11:30 AM",
      service: "AC Inspection",
      status: "cancelled",
      address: "321 Elm St, Anytown, USA",
      notes: "Customer requested cancellation.",
    },
  ],
  onReschedule = () => {},
  onCancel = () => {},
  onViewDetails = () => {},
}: AppointmentsListProps) => {
  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const handleViewDetails = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setIsDetailsOpen(true);
    onViewDetails(appointment.id);
  };

  const handleReschedule = (id: string) => {
    onReschedule(id);
  };

  const handleCancel = (id: string) => {
    onCancel(id);
  };

  // Sort appointments by date (upcoming first, then past)
  const sortedAppointments = [...appointments].sort((a, b) => {
    // First sort by status (scheduled first)
    if (a.status === "scheduled" && b.status !== "scheduled") return -1;
    if (a.status !== "scheduled" && b.status === "scheduled") return 1;

    // Then sort by date (newest first for scheduled, oldest first for completed/cancelled)
    if (a.status === "scheduled" && b.status === "scheduled") {
      return a.date.getTime() - b.date.getTime(); // Ascending for upcoming
    } else {
      return b.date.getTime() - a.date.getTime(); // Descending for past
    }
  });

  return (
    <div className="w-full bg-background p-6 rounded-lg">
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight">My Appointments</h2>
        <p className="text-muted-foreground">
          View and manage your scheduled services
        </p>
      </div>

      {sortedAppointments.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Calendar className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium">No appointments found</h3>
          <p className="text-muted-foreground mt-2">
            You don't have any appointments scheduled yet.
          </p>
          <Button className="mt-6">Schedule New Appointment</Button>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {sortedAppointments.map((appointment) => (
            <Card key={appointment.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{appointment.service}</CardTitle>
                    <CardDescription className="mt-1">
                      {format(appointment.date, "MMMM d, yyyy")} •{" "}
                      {appointment.time}
                    </CardDescription>
                  </div>
                  <Badge
                    variant={getStatusColor(appointment.status)}
                    className="capitalize"
                  >
                    {appointment.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-start">
                    <Calendar className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                    <span className="text-sm">
                      {format(appointment.date, "EEEE, MMMM d, yyyy")}
                    </span>
                  </div>
                  <div className="flex items-start">
                    <Clock className="h-4 w-4 mr-2 mt-0.5 text-muted-foreground" />
                    <span className="text-sm">{appointment.time}</span>
                  </div>
                  {appointment.technician && (
                    <div className="flex items-center">
                      <div className="h-6 w-6 rounded-full bg-primary/10 flex items-center justify-center mr-2">
                        <span className="text-xs font-medium">
                          {appointment.technician
                            .split(" ")
                            .map((name) => name[0])
                            .join("")}
                        </span>
                      </div>
                      <span className="text-sm">{appointment.technician}</span>
                    </div>
                  )}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between pt-3 border-t">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleViewDetails(appointment)}
                >
                  View Details
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    {appointment.status === "scheduled" && (
                      <>
                        <DropdownMenuItem
                          onClick={() => handleReschedule(appointment.id)}
                        >
                          <Edit className="mr-2 h-4 w-4" />
                          Reschedule
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => handleCancel(appointment.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Cancel
                        </DropdownMenuItem>
                      </>
                    )}
                    <DropdownMenuItem
                      onClick={() => handleViewDetails(appointment)}
                    >
                      <AlertCircle className="mr-2 h-4 w-4" />
                      View Details
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* Appointment Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Appointment Details</DialogTitle>
            <DialogDescription>
              {selectedAppointment && (
                <Badge
                  variant={getStatusColor(selectedAppointment.status)}
                  className="mt-2 capitalize"
                >
                  {selectedAppointment.status}
                </Badge>
              )}
            </DialogDescription>
          </DialogHeader>
          {selectedAppointment && (
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-medium">Service</h4>
                <p>{selectedAppointment.service}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium">Date & Time</h4>
                <p>
                  {format(selectedAppointment.date, "EEEE, MMMM d, yyyy")} at{" "}
                  {selectedAppointment.time}
                </p>
              </div>
              <div>
                <h4 className="text-sm font-medium">Location</h4>
                <p>{selectedAppointment.address}</p>
              </div>
              {selectedAppointment.technician && (
                <div>
                  <h4 className="text-sm font-medium">Technician</h4>
                  <p>{selectedAppointment.technician}</p>
                </div>
              )}
              {selectedAppointment.notes && (
                <div>
                  <h4 className="text-sm font-medium">Notes</h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedAppointment.notes}
                  </p>
                </div>
              )}
            </div>
          )}
          <DialogFooter className="flex flex-col sm:flex-row gap-2 sm:gap-0">
            {selectedAppointment?.status === "scheduled" && (
              <>
                <Button
                  variant="outline"
                  onClick={() => handleReschedule(selectedAppointment.id)}
                >
                  Reschedule
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleCancel(selectedAppointment.id)}
                >
                  Cancel Appointment
                </Button>
              </>
            )}
            <Button variant="secondary" onClick={() => setIsDetailsOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AppointmentsList;
