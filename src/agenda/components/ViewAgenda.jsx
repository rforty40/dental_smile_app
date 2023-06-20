// function rangeFunc(start, end, unit = 'day') {
//   let current = start
//   const days = []
//   while (dates.lte(current, end, unit)) {
//     days.push(current)
//     current = dates.add(current, 1, unit)
//   }
//   return days
// }

// function inRange(e, start, end, accessors) {
//   const eStart = dates.startOf(accessors.start(e), 'day')
//   const eEnd = accessors.end(e)
//   const startsBeforeEnd = dates.lte(eStart, end, 'day')
//   const endsAfterStart = !dates.eq(eStart, eEnd, 'minutes')
//     ? dates.gt(eEnd, start, 'minutes')
//     : dates.gte(eEnd, start, 'minutes')
//   return startsBeforeEnd && endsAfterStart
// }

// export const AgendaView = ({ accessors, localizer, length, date, events }) => {
//   const renderDay = (day, events) => {
//     events = events.filter((e) =>
//       inRange(e, dates.startOf(day, 'day'), dates.endOf(day, 'day'), accessors)
//     )
//     return events.map((event, idx) => {
//       return (
//         <div key={idx}>
//           {idx === 0 && (
//             <div className={styles.dateWrap}>
//               <p>{localizer.format(day, 'MMMM DD')}</p>
//               <div className={styles.line} />
//             </div>
//           )}
//           <div
//             className={cn(styles.record, {
//               [styles.canceled]: event.resources.data.canceled,
//             })}
//           >
//             <div className={styles.time}>{timeRangeLabel(day, event)}</div>
//             <div className={styles.eventTitle}>{accessors.title(event)}</div>
//             <div className={styles.details}>
//               <span>City: </span>
//               <span>{event.resources.city}</span>
//             </div>
//           </div>
//         </div>
//       )
//     }, [])
//   }

//   const timeRangeLabel = (day, event) => {
//     const end = accessors.end(event)
//     const start = accessors.start(event)

//     if (!accessors.allDay(event)) {
//       if (dayjs(start).day() === dayjs(end).day()) {
//         const timePeriod = `${dayjs(start).format('h:mma')} – ${dayjs(
//           end
//         ).format('h:mma')}`
//         return timePeriod
//       } else {
//         const startDate = dayjs(start).format('DD-MM YYYY, h:mma')
//         const endDate = dayjs(end).format('DD-MM YYYY, h:mma')
//         return `${startDate} – ${endDate}`
//       }
//     }
//   }

//   const end = dates.add(date, length, 'day')
//   const range = rangeFunc(date, end, 'day')
//   events = events.filter((event) => inRange(event, date, end, accessors))
//   events.sort((a, b) => +accessors.start(a) - +accessors.start(b))

//   return (
//     <div>
//       {events.length !== 0
//         ? range.map((day, idx) => renderDay(day, events, idx))
//         : 'No event dates in range'}
//     </div>
//   )
// }

// AgendaView.title = (start, { localizer }) => {
//   const end = dates.add(start, 1, 'month')
//   return localizer.format({ start, end }, 'agendaHeaderFormat')
// }

// AgendaView.navigate = (date, action) => {
//   const sDate = dayjs(date).startOf('month').toDate()
//   switch (action) {
//     case 'PREV':
//       return dates.add(sDate, -1, 'month')
//     case 'NEXT':
//       return dates.add(sDate, 1, 'month')
//     default:
//       return date
//   }
// }
