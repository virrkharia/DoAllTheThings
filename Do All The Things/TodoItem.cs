﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Do_All_The_Things
{
	public class TodoItem
	{
		public int TodoItemId { get; set; }
		public String Todo { get; set; }
		public byte Priority { get; set; }
		public DateTime? DueDate { get; set; }
	}
}