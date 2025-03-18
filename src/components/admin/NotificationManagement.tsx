import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Bell,
  Calendar,
  Edit,
  Mail,
  MessageSquare,
  Plus,
  Send,
  Trash2,
} from "lucide-react";

interface NotificationTemplate {
  id: string;
  name: string;
  subject: string;
  content: string;
  type: "email" | "sms";
  createdAt: string;
}

interface ScheduledNotification {
  id: string;
  templateId: string;
  templateName: string;
  triggerEvent: string;
  recipients: string;
  scheduledFor: string;
  status: "pending" | "sent" | "failed";
}

const NotificationManagement = ({
  templates = [
    {
      id: "1",
      name: "Appointment Confirmation",
      subject: "Your AC Installation Appointment is Confirmed",
      content:
        "Dear customer, your appointment for AC installation has been confirmed for {{date}} at {{time}}. Our technician will arrive within the scheduled time window.",
      type: "email",
      createdAt: "2023-06-15T10:30:00Z",
    },
    {
      id: "2",
      name: "Appointment Reminder",
      subject: "Reminder: Your AC Service Appointment Tomorrow",
      content:
        "This is a friendly reminder that your AC service appointment is scheduled for tomorrow at {{time}}. Please ensure someone is available to provide access.",
      type: "email",
      createdAt: "2023-06-20T14:45:00Z",
    },
    {
      id: "3",
      name: "Technician Arrival",
      subject: "",
      content:
        "Your AC technician is on the way and will arrive in approximately 30 minutes. Reply HELP if you need to reschedule.",
      type: "sms",
      createdAt: "2023-07-05T09:15:00Z",
    },
  ],
  scheduledNotifications = [
    {
      id: "1",
      templateId: "1",
      templateName: "Appointment Confirmation",
      triggerEvent: "appointment_created",
      recipients: "All customers with new appointments",
      scheduledFor: "Immediately after booking",
      status: "pending",
    },
    {
      id: "2",
      templateId: "2",
      templateName: "Appointment Reminder",
      triggerEvent: "appointment_upcoming",
      recipients: "Customers with appointments within 24 hours",
      scheduledFor: "24 hours before appointment",
      status: "pending",
    },
    {
      id: "3",
      templateId: "3",
      templateName: "Technician Arrival",
      triggerEvent: "technician_dispatched",
      recipients: "Customer with active appointment",
      scheduledFor: "30 minutes before arrival",
      status: "sent",
    },
  ],
}) => {
  const [activeTab, setActiveTab] = useState("templates");
  const [newTemplate, setNewTemplate] = useState({
    name: "",
    subject: "",
    content: "",
    type: "email",
  });
  const [newScheduled, setNewScheduled] = useState({
    templateId: "",
    triggerEvent: "",
    recipients: "",
    scheduledFor: "",
  });

  return (
    <div className="w-full p-6 bg-background">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Notification Management</h1>
        <p className="text-muted-foreground">
          Create and manage notification templates and automated schedules
        </p>
      </div>

      <Tabs
        defaultValue="templates"
        className="w-full"
        onValueChange={setActiveTab}
      >
        <TabsList className="mb-6">
          <TabsTrigger value="templates" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Templates
          </TabsTrigger>
          <TabsTrigger value="scheduled" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Scheduled Notifications
          </TabsTrigger>
          <TabsTrigger value="manual" className="flex items-center gap-2">
            <Send className="h-4 w-4" />
            Send Manual Notification
          </TabsTrigger>
        </TabsList>

        {/* Templates Tab */}
        <TabsContent value="templates" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Notification Templates</h2>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" /> Add New Template
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Subject</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {templates.map((template) => (
                    <TableRow key={template.id}>
                      <TableCell className="font-medium">
                        {template.name}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${template.type === "email" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"}`}
                        >
                          {template.type === "email" ? (
                            <>
                              <Mail className="mr-1 h-3 w-3" />
                              Email
                            </>
                          ) : (
                            <>
                              <MessageSquare className="mr-1 h-3 w-3" />
                              SMS
                            </>
                          )}
                        </span>
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate">
                        {template.subject || "—"}
                      </TableCell>
                      <TableCell>
                        {new Date(template.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Create New Template</CardTitle>
              <CardDescription>
                Design a new notification template for email or SMS
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label
                    htmlFor="template-name"
                    className="text-sm font-medium"
                  >
                    Template Name
                  </label>
                  <Input
                    id="template-name"
                    placeholder="e.g., Appointment Confirmation"
                    value={newTemplate.name}
                    onChange={(e) =>
                      setNewTemplate({ ...newTemplate, name: e.target.value })
                    }
                  />
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="template-type"
                    className="text-sm font-medium"
                  >
                    Notification Type
                  </label>
                  <Select
                    value={newTemplate.type}
                    onValueChange={(value) =>
                      setNewTemplate({
                        ...newTemplate,
                        type: value as "email" | "sms",
                      })
                    }
                  >
                    <SelectTrigger id="template-type">
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="sms">SMS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {newTemplate.type === "email" && (
                <div className="space-y-2">
                  <label
                    htmlFor="template-subject"
                    className="text-sm font-medium"
                  >
                    Email Subject
                  </label>
                  <Input
                    id="template-subject"
                    placeholder="Subject line"
                    value={newTemplate.subject}
                    onChange={(e) =>
                      setNewTemplate({
                        ...newTemplate,
                        subject: e.target.value,
                      })
                    }
                  />
                </div>
              )}

              <div className="space-y-2">
                <label
                  htmlFor="template-content"
                  className="text-sm font-medium"
                >
                  Content
                </label>
                <Textarea
                  id="template-content"
                  placeholder="Enter notification content. Use {{variable}} for dynamic content."
                  rows={6}
                  value={newTemplate.content}
                  onChange={(e) =>
                    setNewTemplate({ ...newTemplate, content: e.target.value })
                  }
                />
                <p className="text-xs text-muted-foreground">
                  Available variables: {"{{"} name {"}}"}, {"{{"} date {"}}"},{" "}
                  {"{{"} time {"}}"}, {"{{"} service {"}}"}
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="mr-2">Save Template</Button>
              <Button
                variant="outline"
                onClick={() =>
                  setNewTemplate({
                    name: "",
                    subject: "",
                    content: "",
                    type: "email",
                  })
                }
              >
                Cancel
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Scheduled Notifications Tab */}
        <TabsContent value="scheduled" className="space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Scheduled Notifications</h2>
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" /> Schedule New Notification
            </Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Template</TableHead>
                    <TableHead>Trigger Event</TableHead>
                    <TableHead>Recipients</TableHead>
                    <TableHead>Scheduled For</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {scheduledNotifications.map((notification) => (
                    <TableRow key={notification.id}>
                      <TableCell className="font-medium">
                        {notification.templateName}
                      </TableCell>
                      <TableCell>{notification.triggerEvent}</TableCell>
                      <TableCell>{notification.recipients}</TableCell>
                      <TableCell>{notification.scheduledFor}</TableCell>
                      <TableCell>
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            notification.status === "sent"
                              ? "bg-green-100 text-green-800"
                              : notification.status === "failed"
                                ? "bg-red-100 text-red-800"
                                : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {notification.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0 text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Schedule New Notification</CardTitle>
              <CardDescription>
                Set up automated notifications based on trigger events
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="template-select"
                  className="text-sm font-medium"
                >
                  Notification Template
                </label>
                <Select
                  value={newScheduled.templateId}
                  onValueChange={(value) =>
                    setNewScheduled({ ...newScheduled, templateId: value })
                  }
                >
                  <SelectTrigger id="template-select">
                    <SelectValue placeholder="Select a template" />
                  </SelectTrigger>
                  <SelectContent>
                    {templates.map((template) => (
                      <SelectItem key={template.id} value={template.id}>
                        {template.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label htmlFor="trigger-event" className="text-sm font-medium">
                  Trigger Event
                </label>
                <Select
                  value={newScheduled.triggerEvent}
                  onValueChange={(value) =>
                    setNewScheduled({ ...newScheduled, triggerEvent: value })
                  }
                >
                  <SelectTrigger id="trigger-event">
                    <SelectValue placeholder="Select trigger event" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="appointment_created">
                      Appointment Created
                    </SelectItem>
                    <SelectItem value="appointment_upcoming">
                      Appointment Upcoming
                    </SelectItem>
                    <SelectItem value="appointment_completed">
                      Appointment Completed
                    </SelectItem>
                    <SelectItem value="technician_dispatched">
                      Technician Dispatched
                    </SelectItem>
                    <SelectItem value="payment_received">
                      Payment Received
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label htmlFor="recipients" className="text-sm font-medium">
                  Recipients
                </label>
                <Input
                  id="recipients"
                  placeholder="e.g., All customers with upcoming appointments"
                  value={newScheduled.recipients}
                  onChange={(e) =>
                    setNewScheduled({
                      ...newScheduled,
                      recipients: e.target.value,
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="scheduled-for" className="text-sm font-medium">
                  Scheduled For
                </label>
                <Select
                  value={newScheduled.scheduledFor}
                  onValueChange={(value) =>
                    setNewScheduled({ ...newScheduled, scheduledFor: value })
                  }
                >
                  <SelectTrigger id="scheduled-for">
                    <SelectValue placeholder="Select timing" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediately">
                      Immediately after event
                    </SelectItem>
                    <SelectItem value="1_hour_before">
                      1 hour before appointment
                    </SelectItem>
                    <SelectItem value="24_hours_before">
                      24 hours before appointment
                    </SelectItem>
                    <SelectItem value="48_hours_before">
                      48 hours before appointment
                    </SelectItem>
                    <SelectItem value="1_hour_after">
                      1 hour after completion
                    </SelectItem>
                    <SelectItem value="24_hours_after">
                      24 hours after completion
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="mr-2">Schedule Notification</Button>
              <Button
                variant="outline"
                onClick={() =>
                  setNewScheduled({
                    templateId: "",
                    triggerEvent: "",
                    recipients: "",
                    scheduledFor: "",
                  })
                }
              >
                Cancel
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Manual Notification Tab */}
        <TabsContent value="manual" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Send Manual Notification</CardTitle>
              <CardDescription>
                Send a one-time notification to specific customers
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label
                  htmlFor="manual-template"
                  className="text-sm font-medium"
                >
                  Notification Template
                </label>
                <Select>
                  <SelectTrigger id="manual-template">
                    <SelectValue placeholder="Select a template" />
                  </SelectTrigger>
                  <SelectContent>
                    {templates.map((template) => (
                      <SelectItem key={template.id} value={template.id}>
                        {template.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="manual-recipients"
                  className="text-sm font-medium"
                >
                  Recipients
                </label>
                <Textarea
                  id="manual-recipients"
                  placeholder="Enter email addresses or phone numbers, separated by commas"
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Preview</label>
                <Card className="bg-muted/50 border-dashed">
                  <CardContent className="p-4">
                    <p className="text-sm">
                      Select a template to preview the content here.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="mr-2 flex items-center gap-2">
                <Send className="h-4 w-4" /> Send Notification
              </Button>
              <Button variant="outline">Cancel</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default NotificationManagement;
