import React, { useState, useEffect } from "react";
import {
  format,
  addDays,
  startOfWeek,
  addWeeks,
  isSameDay,
  isAfter,
  isBefore,
  parseISO,
} from "date-fns";
import {
  Calendar as CalendarIcon,
  Clock,
  ChevronLeft,
  ChevronRight,
  Check,
  X,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import AppointmentConfirmation from "./AppointmentConfirmation";

interface TimeSlot {
  time: string;
  available: boolean;
}

interface ServiceType {
  id: string;
  name: string;
  duration: number;
  price: number;
  description: string;
}

interface Technician {
  id: string;
  name: string;
  specialization: string;
  rating: number;
  available: boolean;
  image?: string;
}

interface SchedulingCalendarProps {
  serviceTypes?: ServiceType[];
  technicians?: Technician[];
  onSchedule?: (appointment: {
    date: Date;
    time: string;
    serviceType: string;
    technician: string;
    address: string;
  }) => void;
  minDate?: Date;
  maxDate?: Date;
  excludeDates?: Date[];
  defaultAddress?: string;
}

const SchedulingCalendar = ({
  serviceTypes = [
    {
      id: "installation",
      name: "AC Installation",
      duration: 180,
      price: 299.99,
      description: "Complete installation of a new air conditioning unit",
    },
    {
      id: "maintenance",
      name: "AC Maintenance",
      duration: 60,
      price: 99.99,
      description: "Regular maintenance service for your AC unit",
    },
    {
      id: "repair",
      name: "AC Repair",
      duration: 120,
      price: 149.99,
      description: "Diagnostic and repair service for AC issues",
    },
    {
      id: "inspection",
      name: "AC Inspection",
      duration: 45,
      price: 79.99,
      description: "Thorough inspection of your AC system",
    },
  ],
  technicians = [
    {
      id: "tech1",
      name: "John Smith",
      specialization: "Installation Expert",
      rating: 4.8,
      available: true,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
    },
    {
      id: "tech2",
      name: "Sarah Johnson",
      specialization: "Maintenance Specialist",
      rating: 4.9,
      available: true,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=sarah",
    },
    {
      id: "tech3",
      name: "Mike Davis",
      specialization: "Repair Technician",
      rating: 4.7,
      available: true,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=mike",
    },
    {
      id: "tech4",
      name: "Emily Wilson",
      specialization: "HVAC Engineer",
      rating: 4.9,
      available: false,
      image: "https://api.dicebear.com/7.x/avataaars/svg?seed=emily",
    },
  ],
  onSchedule = () => {},
  minDate = new Date(),
  maxDate = addDays(new Date(), 30),
  excludeDates = [],
  defaultAddress = "",
}: SchedulingCalendarProps) => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [selectedTime, setSelectedTime] = useState<string | undefined>(
    undefined,
  );
  const [selectedService, setSelectedService] = useState<string>(
    serviceTypes[0].id,
  );
  const [selectedTechnician, setSelectedTechnician] = useState<string>(
    technicians[0].id,
  );
  const [address, setAddress] = useState<string>(defaultAddress);
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [weekStart, setWeekStart] = useState<Date>(
    startOfWeek(new Date(), { weekStartsOn: 0 }),
  );

  // Generate time slots for the selected date
  const generateTimeSlots = (selectedDate: Date | undefined): TimeSlot[] => {
    if (!selectedDate) return [];

    const slots: TimeSlot[] = [];
    const startHour = 8; // 8 AM
    const endHour = 17; // 5 PM
    const interval = 30; // 30 minutes

    for (let hour = startHour; hour <= endHour; hour++) {
      for (let minute = 0; minute < 60; minute += interval) {
        if (hour === endHour && minute > 0) continue;

        const time = `${hour.toString().padStart(2, "0")}:${minute.toString().padStart(2, "0")}`;
        const displayTime = `${hour > 12 ? hour - 12 : hour}:${minute.toString().padStart(2, "0")} ${hour >= 12 ? "PM" : "AM"}`;

        // Randomly determine availability (in a real app, this would come from a database)
        const isAvailable = Math.random() > 0.3;

        slots.push({
          time: displayTime,
          available: isAvailable,
        });
      }
    }

    return slots;
  };

  const timeSlots = generateTimeSlots(date);

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    setSelectedTime(undefined); // Reset time when date changes
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleServiceSelect = (serviceId: string) => {
    setSelectedService(serviceId);
  };

  const handleTechnicianSelect = (techId: string) => {
    setSelectedTechnician(techId);
  };

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      // Final step - show confirmation
      setShowConfirmation(true);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleConfirm = () => {
    if (date && selectedTime && selectedService && selectedTechnician) {
      onSchedule({
        date,
        time: selectedTime,
        serviceType: selectedService,
        technician: selectedTechnician,
        address,
      });
    }
  };

  const handleWeekChange = (direction: "prev" | "next") => {
    setWeekStart(addWeeks(weekStart, direction === "next" ? 1 : -1));
  };

  const isDateInRange = (date: Date) => {
    return isAfter(date, minDate) && isBefore(date, maxDate);
  };

  const isDateExcluded = (date: Date) => {
    return excludeDates.some((excludeDate) => isSameDay(date, excludeDate));
  };

  const getSelectedServiceDetails = () => {
    return serviceTypes.find((service) => service.id === selectedService);
  };

  const getSelectedTechnicianDetails = () => {
    return technicians.find((tech) => tech.id === selectedTechnician);
  };

  const isNextButtonDisabled = () => {
    switch (currentStep) {
      case 1:
        return !date || !selectedTime;
      case 2:
        return !selectedService;
      case 3:
        return !selectedTechnician || !address;
      default:
        return false;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-sm">
      <div className="mb-6">
        <h2 className="text-2xl font-bold tracking-tight">
          Schedule Your Service
        </h2>
        <p className="text-muted-foreground">
          Select your preferred date, time, and service options
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1fr_300px] gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Appointment Details</CardTitle>
                <CardDescription>Step {currentStep} of 3</CardDescription>
              </div>
              <div className="flex space-x-1">
                <Badge
                  variant={currentStep === 1 ? "default" : "outline"}
                  className="rounded-full h-6 w-6 p-0 flex items-center justify-center"
                >
                  1
                </Badge>
                <Badge
                  variant={currentStep === 2 ? "default" : "outline"}
                  className="rounded-full h-6 w-6 p-0 flex items-center justify-center"
                >
                  2
                </Badge>
                <Badge
                  variant={currentStep === 3 ? "default" : "outline"}
                  className="rounded-full h-6 w-6 p-0 flex items-center justify-center"
                >
                  3
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={`step-${currentStep}`} className="w-full">
              {/* Step 1: Date and Time Selection */}
              <TabsContent
                value="step-1"
                className={currentStep === 1 ? "block" : "hidden"}
              >
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-medium mb-2">Select Date</h3>
                    <div className="grid gap-2">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !date && "text-muted-foreground",
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date ? format(date, "PPP") : "Select a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={date}
                            onSelect={handleDateSelect}
                            disabled={(date) => {
                              return (
                                isBefore(date, minDate) ||
                                isAfter(date, maxDate) ||
                                isDateExcluded(date)
                              );
                            }}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">Select Time</h3>
                    {date ? (
                      <div className="grid grid-cols-3 gap-2">
                        {timeSlots.map((slot, index) => (
                          <Button
                            key={index}
                            variant={
                              selectedTime === slot.time ? "default" : "outline"
                            }
                            className={cn(
                              "justify-center",
                              !slot.available &&
                                "opacity-50 cursor-not-allowed",
                            )}
                            disabled={!slot.available}
                            onClick={() => handleTimeSelect(slot.time)}
                          >
                            <Clock className="mr-2 h-4 w-4" />
                            {slot.time}
                          </Button>
                        ))}
                      </div>
                    ) : (
                      <p className="text-muted-foreground">
                        Please select a date first
                      </p>
                    )}
                  </div>
                </div>
              </TabsContent>

              {/* Step 2: Service Selection */}
              <TabsContent
                value="step-2"
                className={currentStep === 2 ? "block" : "hidden"}
              >
                <div className="space-y-4">
                  <h3 className="text-lg font-medium mb-2">Select Service</h3>
                  <div className="grid gap-3">
                    {serviceTypes.map((service) => (
                      <div
                        key={service.id}
                        className={cn(
                          "border rounded-lg p-4 cursor-pointer transition-colors",
                          selectedService === service.id
                            ? "border-primary bg-primary/5"
                            : "hover:border-primary/50",
                        )}
                        onClick={() => handleServiceSelect(service.id)}
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-medium">{service.name}</h4>
                            <p className="text-sm text-muted-foreground">
                              {service.description}
                            </p>
                            <div className="mt-1 text-sm">
                              Duration: {service.duration} minutes
                            </div>
                          </div>
                          <div className="flex flex-col items-end">
                            <span className="font-bold">
                              ${service.price.toFixed(2)}
                            </span>
                            {selectedService === service.id && (
                              <Check className="h-4 w-4 text-primary mt-1" />
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </TabsContent>

              {/* Step 3: Technician and Address */}
              <TabsContent
                value="step-3"
                className={currentStep === 3 ? "block" : "hidden"}
              >
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-2">
                      Select Technician
                    </h3>
                    <div className="grid gap-3">
                      {technicians
                        .filter((tech) => tech.available)
                        .map((tech) => (
                          <div
                            key={tech.id}
                            className={cn(
                              "border rounded-lg p-3 cursor-pointer transition-colors flex items-center",
                              selectedTechnician === tech.id
                                ? "border-primary bg-primary/5"
                                : "hover:border-primary/50",
                            )}
                            onClick={() => handleTechnicianSelect(tech.id)}
                          >
                            <div className="h-10 w-10 rounded-full overflow-hidden mr-3">
                              <img
                                src={tech.image}
                                alt={tech.name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="flex-grow">
                              <h4 className="font-medium">{tech.name}</h4>
                              <p className="text-sm text-muted-foreground">
                                {tech.specialization}
                              </p>
                            </div>
                            <div className="flex items-center">
                              <span className="text-sm font-medium mr-1">
                                {tech.rating}
                              </span>
                              <svg
                                className="h-4 w-4 fill-yellow-400 text-yellow-400"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                              >
                                <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                              </svg>
                              {selectedTechnician === tech.id && (
                                <Check className="h-4 w-4 text-primary ml-2" />
                              )}
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-medium mb-2">
                      Service Address
                    </h3>
                    <textarea
                      className="w-full p-2 border rounded-md h-24"
                      placeholder="Enter your full address"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePreviousStep}
              disabled={currentStep === 1}
            >
              <ChevronLeft className="mr-2 h-4 w-4" /> Back
            </Button>
            <Button onClick={handleNextStep} disabled={isNextButtonDisabled()}>
              {currentStep < 3 ? (
                <>
                  Next <ChevronRight className="ml-2 h-4 w-4" />
                </>
              ) : (
                "Schedule Appointment"
              )}
            </Button>
          </CardFooter>
        </Card>

        {/* Summary Card */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Appointment Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="text-sm font-medium text-muted-foreground">
                  Date & Time
                </h4>
                {date && selectedTime ? (
                  <p className="font-medium">
                    {format(date, "MMMM d, yyyy")} at {selectedTime}
                  </p>
                ) : (
                  <p className="text-muted-foreground">Not selected yet</p>
                )}
              </div>

              <Separator />

              <div>
                <h4 className="text-sm font-medium text-muted-foreground">
                  Service
                </h4>
                {getSelectedServiceDetails() ? (
                  <div>
                    <p className="font-medium">
                      {getSelectedServiceDetails()?.name}
                    </p>
                    <p className="text-sm">
                      ${getSelectedServiceDetails()?.price.toFixed(2)} •{" "}
                      {getSelectedServiceDetails()?.duration} minutes
                    </p>
                  </div>
                ) : (
                  <p className="text-muted-foreground">Not selected yet</p>
                )}
              </div>

              <Separator />

              <div>
                <h4 className="text-sm font-medium text-muted-foreground">
                  Technician
                </h4>
                {getSelectedTechnicianDetails() ? (
                  <div className="flex items-center">
                    <div className="h-8 w-8 rounded-full overflow-hidden mr-2">
                      <img
                        src={getSelectedTechnicianDetails()?.image}
                        alt={getSelectedTechnicianDetails()?.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <p className="font-medium">
                      {getSelectedTechnicianDetails()?.name}
                    </p>
                  </div>
                ) : (
                  <p className="text-muted-foreground">Not selected yet</p>
                )}
              </div>

              {address && (
                <>
                  <Separator />
                  <div>
                    <h4 className="text-sm font-medium text-muted-foreground">
                      Address
                    </h4>
                    <p className="text-sm">{address}</p>
                  </div>
                </>
              )}
            </CardContent>
            {getSelectedServiceDetails() && (
              <CardFooter className="flex justify-between border-t pt-4">
                <span className="text-muted-foreground">Total</span>
                <span className="font-bold text-lg">
                  ${getSelectedServiceDetails()?.price.toFixed(2)}
                </span>
              </CardFooter>
            )}
          </Card>

          <div className="text-sm text-muted-foreground">
            <p>
              <span className="font-medium">Note:</span> A confirmation will be
              sent to your email after scheduling. You can cancel or reschedule
              up to 24 hours before your appointment.
            </p>
          </div>
        </div>
      </div>

      {/* Confirmation Dialog */}
      {showConfirmation &&
        date &&
        selectedTime &&
        getSelectedServiceDetails() &&
        getSelectedTechnicianDetails() && (
          <AppointmentConfirmation
            appointment={{
              id: `APT-${Math.floor(Math.random() * 10000)}`,
              date: date,
              time: selectedTime,
              service: getSelectedServiceDetails()?.name || "",
              price: getSelectedServiceDetails()?.price || 0,
              technician: getSelectedTechnicianDetails()?.name || "",
              address: address,
            }}
            onConfirm={handleConfirm}
            onCancel={() => setShowConfirmation(false)}
            isOpen={showConfirmation}
          />
        )}
    </div>
  );
};

export default SchedulingCalendar;
